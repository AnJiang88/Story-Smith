import React, { useState, useEffect } from 'react'
import Prompt from './components/Prompt';
import UserInput from './components/UserInput';
import FeedbackBubble from './components/feedback/FeedbackBubble';
import './App.scss';
import { chatCompletion } from './api/api';
import { send } from 'process';

const MAX_SENTENCES = 3;

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<string>("");
  const [isAutoFeedback, setIsAutoFeedback] = useState(false);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (isAutoFeedback) {
      startInterval();
    } else {
      setSentenceCount(0)
      clearInterval(intervalId);
    }   
  }, [isAutoFeedback]);

  useEffect(() => {
    if (sentenceCount === MAX_SENTENCES) {
      setSentenceCount(0)
      resetInterval();
      sendChatCompletion();
    };
  }, [sentenceCount]);

  const startInterval = () => {
    setSentenceCount(0);
    setIntervalId(setInterval(() => {
      sendChatCompletion();
    }, 60000)); // 60 seconds
  };

  const resetInterval = () => {
    if (isAutoFeedback) {
      clearInterval(intervalId);
      startInterval();
    }
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resetInterval();
    sendChatCompletion();
  };

  const sendChatCompletion = () => { 
    chatCompletion(prompt, userText, 512).then((aiFeedback) => {
      setFeedback(aiFeedback);
    })
  }

  return (
    <>
      <div className="container">
        <section className="main">
          <h1 className="title">StorySmith</h1>
          <Prompt prompt={prompt} setPrompt={setPrompt} />
          <div className="student-section">
          <UserInput
            userText={userText}
            setUserText={setUserText}
            sentenceCount={sentenceCount}
            setSentenceCount={setSentenceCount}
            onSubmitText={handleSubmit}
            isAutoFeedback={isAutoFeedback}
            setIsAutoFeedback={setIsAutoFeedback}
          />
            {feedback && <FeedbackBubble text={feedback} />}
          </div>
        </section>
      </div>
    </>
  )
}

export default App