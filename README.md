# NyayaSahaya Legal Assistant Documentation

## Project Overview
NyayaSahaya is a comprehensive legal assistance platform that combines multiple tools to help users with legal document generation, chatbot assistance, and document summarization. The project is built using React for the frontend and Python (FastAPI) for the backend, with integrated AI capabilities.

## Architecture

### Frontend Components
- **App.js**: Main application router and layout component
  - Handles routing between different sections
  - Implements navigation bar
  - Includes Particles background effect
  - Routes:
    - Home
    - DocGenerator
    - Chatbot
    - DocSummariser
    - About Us

### Backend Services

#### 1. Legal Chatbot (app.py)
- Built with FastAPI
- Features:
  - Conversational AI using LangChain
  - FAISS vector database for legal document retrieval
  - Mixtral-8x22B-Instruct model for response generation
  - Custom prompt template for structured legal responses
- Components:
  - CORS middleware for cross-origin requests
  - ConversationalRetrievalChain for managing chat context
  - Memory management using ConversationBufferWindowMemory

#### 2. Document Generator (doc_generator.py)
- Built with Streamlit
- Features:
  - Multiple document type support:
    - Sale Deed
    - Will
    - Power of Attorney
  - PDF generation using ReportLab
  - Custom styling with CSS
  - Document preview functionality

## API Endpoints

### Chat API
```
POST /api/chat
```
- Request body: `{ "question": string }`
- Response format:
```json
{
    "answer": {
        "Applicable Law and Section": {...},
        "Legal Consequences": {...},
        "Steps to Take": [...],
        "Additional Support": [...],
        "Key Reminder": string
    }
}
```

## Features

### 1. Document Generation
- Supports multiple legal document types
- Dynamic form fields based on document type
- PDF preview and download functionality
- Professional formatting and styling
- Template-based document generation

### 2. Legal Chatbot
- AI-powered legal assistance
- Context-aware responses
- Structured answer format including:
  - Applicable laws and sections
  - Legal consequences
  - Steps to take
  - Additional support information
  - Key reminders
- Conversation memory for contextual responses

### 3. Document Summarizer
- Ability to analyze and summarize legal documents
- Integration with main application

## Technical Implementation

### Dependencies
- Frontend:
  - React
  - React Router
  - Particles.js
- Backend:
  - FastAPI
  - LangChain
  - FAISS
  - HuggingFace Embeddings
  - Together AI
  - ReportLab
  - Streamlit

### Environment Setup
Required environment variables:
```
TOGETHER_API_KEY=your_api_key
```

### Security Features
- CORS middleware implementation
- API key protection
- Secure PDF generation
- Input validation

## Installation and Setup

1. Clone the repository
2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
- Create a `.env` file
- Add required API keys and configurations

5. Start the services:
- Frontend: `npm start`
- Backend: `uvicorn app:app --reload`
- Document Generator: `streamlit run doc_generator.py`

## Best Practices

### Code Organization
- Modular component structure
- Separate routing logic
- Consistent styling approach
- Clear separation of concerns

### Error Handling
- Comprehensive error checking in document generation
- API error responses
- User input validation
- Graceful fallbacks

### Performance Considerations
- Efficient PDF generation
- Optimized vector search
- Memory management for chat context
- Responsive design implementation

## Future Enhancements
1. Additional document types support
2. Enhanced chatbot capabilities
3. Multi-language support
4. Advanced document analysis features
5. User authentication system
6. Document storage and management
7. Integration with legal databases

## Maintenance and Support
- Regular updates to legal templates
- API monitoring and maintenance
- Database optimization
- User feedback integration

This documentation serves as a comprehensive guide for developers working on or maintaining the NyayaSahaya Legal Assistant platform. For specific implementation details, refer to the inline comments in the respective source files.
