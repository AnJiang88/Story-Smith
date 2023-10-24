import React, { useState, useEffect } from 'react'
import Prompt from './Components/Prompt';
import UserInput from './Components/UserInput';
import FeedbackBubble from './Components/feedback/FeedbackBubble';
import './App.scss';

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [userText, setUserText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // send userText to api
    console.log('User text submitted:', userText);
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
            <FeedbackBubble text="Consider providing more specific details and examples to support your points. For example, blah blah blah testing testing" />
          </div>
          
        </section>
      </div>
    </>
  )
}

export default App