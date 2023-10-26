import React, { useState, useEffect } from 'react'
import Prompt from './components/prompt/Prompt';
import UserInput from './components/userInput/UserInput';
import FeedbackBubble from './components/feedback/FeedbackBubble';
import './App.scss';
import logo from './assets/storysmith-icon.png'
import { chatCompletion } from './api/api';

const MAX_SENTENCES = 3;

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [userText, setUserText] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
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
      setSentenceCount(0)
      sendChatCompletion();
    }, 60000)); // 60 seconds
  };

  const resetInterval = () => {
    if (isAutoFeedback) {
      setSentenceCount(0)
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
          <div className="header">
            <img className="logo" src={logo} alt="" />
            <h1 className="title">StorySmith</h1>
          </div>
          <div className="content">
            <div className="left-content">
              <Prompt prompt={prompt} setPrompt={setPrompt} />
              <UserInput
                userText={userText}
                setUserText={setUserText}
                sentenceCount={sentenceCount}
                setSentenceCount={setSentenceCount}
                onSubmitText={handleSubmit}
                isAutoFeedback={isAutoFeedback}
                setIsAutoFeedback={setIsAutoFeedback}
              />
            </div>
            {feedback && <FeedbackBubble text={feedback} />}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
