import React, { useState, useEffect } from 'react'
import Prompt from './Components/Prompt';
import UserInput from './Components/UserInput';
import FeedbackBubble from './Components/feedback/FeedbackBubble';
import './App.scss';
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
          <div className="student-section">
            <UserInput userText={userText} setUserText={setUserText} onSubmitText={handleSubmit} />
            <FeedbackBubble text={feedback} />
          </div>
        </section>
      </div>
    </>
  )
}

export default App