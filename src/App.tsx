import React, { useState, useEffect } from 'react'
import Prompt from './components/Prompt';
import UserInput from './components/UserInput';

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [userText, setUserText] = useState('');

  useEffect(() => {
    
  })

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
          <UserInput userText={userText} setUserText={setUserText} onSubmitText={handleSubmit} />
        </section>
      </div>
    </>
  )
}

export default App