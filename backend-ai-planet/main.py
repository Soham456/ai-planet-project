from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import pymupdf4llm
from fastapi import FastAPI, WebSocket, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this if your frontend runs on a different port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


pdf_data=""
# websocket to create a chat app
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text(f"Ai: Hey I am an helpful AI BOT , How may I help you?")

    context = ""
    while True:
        user_input = await websocket.receive_text()
        await websocket.send_text(f"You: {user_input}")
        
        result = chain.invoke({"pdf_data":pdf_data, "context":context, "question":user_input})
        print(result)
        await websocket.send_text(f"Ai: {result}")

# api to upload to file
@app.post("/upload/")
async def upload_file(file: UploadFile):
    print("here file upload funtion")
    global pdf_data
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Please upload a PDF file!!")

    file_location = f"data/input/{file.filename}"
    
    # Ensure the directory exists
    os.makedirs(os.path.dirname(file_location), exist_ok=True)
    
    with open(file_location, "wb") as f:
        content = await file.read() 
        f.write(content)  
    
    # create markdown for llm to refer from
    pdf_data = pymupdf4llm.to_markdown(file_location)
    
    return {
        "pdf_name": file.filename,
        "Content-Type": file.content_type,
        "file_location": file_location,
        "file_size": f"{file.size / 1_048_576:.2f} MB",
    }


template = """
You are helpful ai bot provided with pdf content for reference to answer questions asked by user. Answer the Questions asked by user. 
Incase there is empty pdf content ask for pdf from user
PDF Content:
{pdf_data}
 
Conversation History:
{context}

User Question: {question}

Your Answer:
"""

model = OllamaLLM(model="llama3.2:1b")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model