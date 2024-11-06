import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography, TextField, Button } from '@mui/material';

const Chatbox: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const socketRef = useRef<WebSocket>();
    const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to track the end of messages
    const [file, setFile] = useState<File | null>(null);
    const [userInput, setUserInput] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socketRef.current = new WebSocket("ws://localhost:8000/ws");

        // Check if WebSocket connection is open
        socketRef.current.onopen = () => console.log("WebSocket connected");

        socketRef.current.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        return () => {
            socketRef.current?.close();
        };
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleButtonClick = (event) => {
        event.preventDefault();
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const formData = new FormData();
        formData.append("file", selectedFile);
        
        const loadingToastId = toast.loading("Uploading...", {
            position: "top-right",
            theme: "colored",
        });

        try {
            const response = await fetch("http://localhost:8000/upload/", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Failed to upload PDF");
            }

            await response.json();
            toast.dismiss(loadingToastId);
            toast.success("File uploaded successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const handleInput = (event) => {
        if (event.key === 'Enter' && userInput.trim() !== "") {
            socketRef.current?.send(userInput);
            setUserInput("");
        }
    };

    return (
        <Box sx={{ height: 80, p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8f9fa', p: 1, borderBottom: '1px solid #ddd' }}>
                <Typography variant="h6" fontWeight="bold">Chat</Typography>
                {file && <Typography>{file.name}</Typography>}
                {/* button to upload file */}
                <Button variant="outlined" onClick={handleButtonClick}>Upload PDF</Button>
                {/* hidden file upload component */}
                <TextField
                    type="file"
                    inputRef={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    inputProps={{ accept: 'application/pdf' }}
                />
            </Box>

            <Box sx={{ mt: 1, p: 2, bgcolor: 'white', height: 'calc(100vh - 175px)', overflowY: 'scroll', borderRadius: 1, boxShadow: 1 }}>
            {/* container to show toast */}
            <ToastContainer />
                {messages.map((message, index) => (
                    // display messages from textbox
                    <Box key={index} sx={{ display: 'flex', justifyContent: message[0] === 'A' ? 'flex-start' : 'flex-end', mb: 2 }}>
                        <Box sx={{ bgcolor: message[0] === 'A' ? '#e0f7fa' : '#dcf8c6', borderRadius: 2, p: 1.5, maxWidth: '75%' }}>
                            <Typography variant="body1"
                             sx={{ 
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word'
                            }}
                            >{message}</Typography>
                        </Box>
                    </Box>
                ))}
                {/* scroll ref when new message pops up */}
                <div ref={messagesEndRef} />
            </Box>

            <TextField
                fullWidth
                variant="outlined"
                placeholder="Send a message..."
                sx={{ mt: 1, mb: 1 }}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleInput}
                value={userInput}
            />
        </Box>
    );
};

export default Chatbox;
