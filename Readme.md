# AI-Powered PDF Query Bot

This project is an innovative web application that leverages the power of **FastAPI**, **Langchain**, and **Ollama** to create an interactive AI-powered chatbot capable of answering questions based on the content of PDF documents. Designed with a flexible, scalable architecture, this application seamlessly integrates with both frontend and backend components to provide real-time, personalized user experiences.

## Key Features:
- **FastAPI Backend**: A high-performance backend built with FastAPI, enabling asynchronous handling of API requests and WebSocket connections for real-time interaction with the AI bot.
- **Real-time Chatbot**: The core functionality revolves around a WebSocket-based chat system, where users can ask questions and receive responses powered by an intelligent language model.
- **Langchain Integration**: Utilizes the **Langchain** framework for efficient prompt engineering and integration with large language models (LLMs). This allows the system to process and generate natural language responses tailored to the user’s inquiries.
- **Ollama LLM**: Powered by **Ollama**, a cutting-edge language model, the system processes user queries with high accuracy and context awareness, delivering insightful responses based on the uploaded PDF content.
- **PDF Handling**: Users can upload PDF files, and the application extracts and converts the PDF text into markdown format for easy reference by the AI model, ensuring accurate responses.
- **Interactive User Interface**: The frontend, built with **React**, allows users to upload PDF documents and engage with the AI bot through a clean, intuitive interface, providing real-time interactions directly in the browser.

## Use Cases:
- **Document Assistance**: Ideal for users needing help understanding the content of long PDF documents, research papers, or technical manuals.
- **Learning Aid**: Can be used as a learning tool where users interact with the system to ask questions based on textbooks or study materials in PDF format.
- **Customer Support**: Great for providing automated support, where customers can upload manuals or documentation, and the AI will answer queries based on the content.

## Technologies Used:
- **FastAPI**: High-performance web framework for building APIs.
- **Langchain**: Advanced framework for building language model-powered applications.
- **Ollama**: Powerful language model for natural language understanding and interaction.
- **React**: Modern JavaScript library for building interactive user interfaces.
- **Uvicorn**: ASGI server to run the FastAPI app in production.
- **PyMuPDF**: Library used to extract and convert PDF content into markdown format.

## Prerequisites

Before getting started, ensure you have the following installed:

- Python 3.8+
- Node.js (LTS version)
- npm (comes with Node.js)

### FastAPI Backend Setup

1. Navigate to the `backend-ai-planet/` directory:
   from root directory
   `cd backend-ai-planet`

2. Install Python Dependencies:
    `pip install fastapi uvicorn langchain-core langchain-ollama pymupdf4llm`

3. Run FastAPI:
    `fastapi run main.py`

4. The FastAPI Swagger will be available at http://localhost:8000/docs


### React Frontend Setup

1. Navigate to the `ai-planet-frontend/` directory:
    from root directory
    `cd ai-planet-frontend`

2. Install React Dependencies:
    `npm install`

3. Run React App:
    `npm run dev`

### Watch the Demo Video

You can watch the demo video here:

[![Watch Demo Video](https://drive.google.com/thumbnail?id=1_fZ8wBUP50p9v5M9H1Y1BHTvfWUQi-Wx)](https://drive.google.com/file/d/1_fZ8wBUP50p9v5M9H1Y1BHTvfWUQi-Wx/view?usp=sharing)

