import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import Prompt from './components/Prompt';
import UserInput from './components/UserInput';
import { chatCompletion } from './api/api';

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    chatCompletion(prompt, userText, 512).then((aiFeedback) => {
      setFeedback(aiFeedback);
    })
  };

  return (
    <>
      <div className="container">
        <section className="main">
          <h1>StorySmith</h1>
          <Prompt prompt={prompt} setPrompt={setPrompt} />
          <br></br>
          <UserInput userText={userText} setUserText={setUserText} onSubmitText={handleSubmit} />
          <br></br>
          <p>{feedback}</p>
        </section>
      </div>
    </>
  )
}

export default App