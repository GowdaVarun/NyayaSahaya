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

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable CORS to handle OPTIONS requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; restrict in production
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
    allow_credentials=True,  # Support cookies if needed
)

# Load embeddings and database
embeddings = HuggingFaceEmbeddings(model_name="law-ai/InLegalBERT")
try:
    db = FAISS.load_local("ipc_embed_db", embeddings, allow_dangerous_deserialization=True)
    print("FAISS database loaded successfully!")
except Exception as e:
    print("Error loading FAISS database:", e)

db_retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 3})

# Define the prompt template
legal_prompt_template = """
You are a legal chatbot specializing in Indian law.
CONTEXT: {context}
CHAT HISTORY: {chat_history}
QUESTION: {question}
INSTRUCTIONS:
- Provide a structured response in the following format:

Response Format
1. Applicable Law and Section:
Law: [Name of the law]
Relevant Sections:
[Section number]: [Brief description of the section]
[Section number]: [Brief description of the section]
2. Legal Consequences:
Imprisonment: [Maximum duration of imprisonment]
Fine: [Maximum fine amount]
Both: [Details on when both may apply]
3. Steps to Take if Accused:
[Step 1]: [Brief description of what to do, e.g., collect evidence, seek legal help, etc.]
[Step 2]: [Brief description of the next step, e.g., review allegations, negotiate, etc.]
[Step 3]: [Additional steps if needed]
4. Additional Support:
[Contact relevant organization or authority for free or additional help]
[Mention alternative dispute resolution methods, if applicable]
5. Key Reminder:
[Include a general reminder, such as consulting a licensed lawyer for personalized advice.]

ANSWER:
"""
legal_prompt = PromptTemplate(template=legal_prompt_template, input_variables=["context", "question", "chat_history"])

# Initialize memory to handle the conversation context
memory = ConversationBufferWindowMemory(k=2, memory_key="chat_history", return_messages=True)

# Initialize the conversational retrieval chain
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

# Define general responses for casual interactions
def handle_general_responses(question):
    greetings = ["hi", "hello", "hey", "good morning", "good evening", "howdy", "hola"]
    casual_questions = {
        "how are you": "I'm just a chatbot, but I'm here to help you!",
        "what can you do": "I can assist with Indian legal queries and provide helpful information. Ask me anything!",
        "who are you": "I am NyayaSahaya, your legal assistant specializing in Indian law.",
        "what should I do": "Please provide more details about your situation so I can assist you better.",
        "how can you help": "I can provide guidance on Indian legal matters. Feel free to ask me anything related to the law!",
        "tell me a joke": "I may not be a comedian, but here’s a legal one: Why don’t lawyers play hide and seek? Because good lawyers never hide and bad lawyers never seek!",
        "goodbye": "Goodbye! Feel free to reach out if you have more questions. Take care!!",
        "who created you" : "I was created by the NyayaSahaya team consisting of Apurva Sankol , Jason Alva, Maheshkumar, Sumadhva Krishna, Varun Gowda .",
    }

    question_lower = question.lower()

    if any(greet in question_lower for greet in greetings):
        return "Hello! How can I assist you today?"

    for key, response in casual_questions.items():
        if key in question_lower:
            return response

    return None

@app.post("/api/chat")
async def chat(request: Request):
    """Handles user queries."""
    try:
        data = await request.json()
        question = data.get("question")
        if not question:
            return JSONResponse({"error": "Question is required"}, status_code=400)

        # Handle general responses
        general_response = handle_general_responses(question)
        if general_response:
            return {"answer": general_response}

        # Use the conversational chain to get the response
        result = qa.invoke({"question": question})
        answer = result.get("answer", "I could not process your query. Please try rephrasing.").strip()
        return {"answer": answer}
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
