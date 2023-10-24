import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import Prompt from './Components/Prompt';

interface ChatData {
  role: string;
  content: string;
}

function App() {
  const [prompt, setPrompt] = useState<string>("");

  const submitHandler = async (e: any) => {
    
  }

  useEffect(() => {
    
  })

  return (
    <>
      <div className="container">
        <section className="main">
          <h1>StorySmith</h1>
          <Prompt prompt={prompt} setPrompt={setPrompt} />
          
        </section>
      </div>
    </>
  )
}

export default App