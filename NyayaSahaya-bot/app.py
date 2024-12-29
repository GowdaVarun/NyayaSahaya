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
db = FAISS.load_local("ipc_embed_db", embeddings, allow_dangerous_deserialization=True)
db_retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 3})

# Define the prompt template
prompt_template = """
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
prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question", "chat_history"])

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
    combine_docs_chain_kwargs={"prompt": prompt},
)

@app.post("/api/chat")
async def chat(request: Request):
    """Handles user queries."""
    try:
        data = await request.json()
        question = data.get("question")
        if not question:
            return JSONResponse({"error": "Question is required"}, status_code=400)
        
        # Use the conversational chain to get the response
        result = qa.invoke({"question": question})
        answer = result.get("answer", "I could not process your query.").strip()
        return {"answer": answer}
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
