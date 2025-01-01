from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain_together import Together
from langchain.memory import ConversationBufferWindowMemory
import os
from dotenv import load_dotenv
import re

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

embeddings = HuggingFaceEmbeddings(model_name="law-ai/InLegalBERT")
try:
    db = FAISS.load_local("ipc_embed_db", embeddings, allow_dangerous_deserialization=True)
    print("FAISS database loaded successfully!")
except Exception as e:
    print("Error loading FAISS database:", e)

db_retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 3})

legal_prompt_template = """
You are NyayaSahaya, a specialized legal assistant for Indian law. Maintain a professional yet approachable tone.

CONTEXT: {context}
CHAT HISTORY: {chat_history}
QUESTION: {question}

If the query is not legal in nature, respond naturally without the formal structure.

For legal queries, provide a structured response as follows:

1. Applicable Law and Section:
- Law: [Name]
- Sections: [Numbers and descriptions]

2. Legal Consequences:
- Imprisonment: [Duration]
- Fine: [Amount]
- Combined penalties if applicable

3. Steps to Take:
- Immediate actions
- Legal remedies
- Preventive measures

4. Additional Support:
- Relevant authorities
- Legal aid options
- Alternative resolution methods

5. Key Reminder:
Brief note about consulting licensed professionals

Keep responses clear, factual, and focused on Indian law.
ANSWER:
"""

legal_prompt = PromptTemplate(template=legal_prompt_template, input_variables=["context", "question", "chat_history"])

memory = ConversationBufferWindowMemory(k=3, memory_key="chat_history", return_messages=True)

llm = Together(
    model="mistralai/Mixtral-8x22B-Instruct-v0.1",
    temperature=0.5,
    max_tokens=1024,
    together_api_key=os.getenv("TOGETHER_API_KEY"),
)

qa = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=db_retriever,
    memory=memory,
    combine_docs_chain_kwargs={"prompt": legal_prompt},
)

def is_legal_query(text):
    legal_keywords = {
        'general': ['law', 'legal', 'court', 'rights', 'case', 'lawyer', 'advocate'],
        'criminal': ['ipc', 'crpc', 'crime', 'arrest', 'bail', 'police', 'criminal'],
        'civil': ['contract', 'property', 'marriage', 'divorce', 'inheritance'],
        'procedural': ['petition', 'filing', 'evidence', 'witness', 'complaint'],
    }
    
    text_lower = text.lower()
    return any(keyword in text_lower for keywords in legal_keywords.values() for keyword in keywords)

def handle_general_responses(question):
    conversation_patterns = {
        'greetings': {
            'patterns': [r'\b(hi|hello|hey|good\s+(?:morning|evening|afternoon)|howdy|hola)\b'],
            'responses': [
                "Hello! I'm NyayaSahaya, your legal assistant. How can I help you today?",
                "Hi there! Need help with any legal matters?",
                "Hello! How can I assist you with legal guidance today?"
            ]
        },
        'farewells': {
            'patterns': [r'\b(bye|goodbye|farewell|see\s+you|Thank\s+you|thank\s+you)\b'],
            'responses': [
                "Goodbye! Feel free to return for any legal assistance.",
                "Take care! I'm here 24/7 for your legal questions."
            ]
        },
        'identity': {
            'patterns': [r'\b(who\s+are\s+you|what\s+are\s+you|tell\s+me\s+about\s+yourself)\b'],
            'responses': [
                "I'm NyayaSahaya, an AI legal assistant specializing in Indian law, created by Apurva Sankol, Jason Alva, Maheshkumar, Sumadhva Krishna, and Varun Gowda."
            ]
        },
        'capabilities': {
            'patterns': [r'\b(what\s+can\s+you\s+do|how\s+can\s+you\s+help|what\s+do\s+you\s+do)\b'],
            'responses': [
                "I specialize in Indian law and can help with legal advice, understanding procedures, rights, regulations, and case law. What would you like to know?"
            ]
        },
        'gpt_comparison': {
            'patterns': [r'\b(better\s+than\s+gpt|compare\s+to\s+gpt|vs\s+gpt|compare\s+with\s+chatgpt|are\s+you\s+better\s+than\s+chatgpt)\b'],
            'responses': [
                "I'm NyayaSahaya, specialized in Indian law with a focus on providing structured, accurate legal guidance. Instead of comparing, let me help you with your legal questions to demonstrate my capabilities."
            ]
        }
    }

    question_lower = question.lower()
    
    for category, data in conversation_patterns.items():
        for pattern in data['patterns']:
            if re.search(pattern, question_lower):
                return data['responses'][0]
    
    if not is_legal_query(question):
        return "I specialize in Indian legal matters. Could you please ask me a law-related question?"
    
    return None

@app.post("/api/chat")
async def chat(request: Request):
    try:
        data = await request.json()
        question = data.get("question", "").strip()
        
        if not question:
            return JSONResponse({"error": "Question is required"}, status_code=400)

        general_response = handle_general_responses(question)
        if general_response:
            return {"answer": general_response}

        result = qa.invoke({"question": question})
        answer = result.get("answer", "").strip()
        
        if not answer:
            return {"answer": "I couldn't understand your query. Could you please rephrase it?"}
            
        return {"answer": answer}
        
    except Exception as e:
        return JSONResponse(
            {"error": "An error occurred while processing your request. Please try again."}, 
            status_code=500
        )