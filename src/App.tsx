import React, { useState, useEffect } from 'react'
import Prompt from './components/Prompt';
import UserInput from './components/UserInput';
import FeedbackBubble from './components/feedback/FeedbackBubble';
import './App.scss';
import { chatCompletion, incorporateFeedback, writeStory } from './api/api';
import useKeybind from './hooks/useKeybind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MAX_SENTENCES = 3;

const devToolKeybindCondition = (event: KeyboardEvent) => event.altKey && event.shiftKey && event.code === "KeyW";

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [userText, setUserText] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isAutoFeedback, setIsAutoFeedback] = useState(false);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  
  const [devToolOn, setDevToolOn] = useState(false);
  useKeybind(devToolKeybindCondition, () => {
    setDevToolOn(!devToolOn);
    toast.warn(`GPTStudent is now ${devToolOn ? 'off' : 'on'}`);
  });

  useEffect(() => {
    if (devToolOn) {
      
      if (!feedback || !userText) {
        setUserText('...GPTStudent is writing a story based on the prompt...');
        writeStory(prompt).then((gptStory) => {
          setUserText(gptStory)
        });
      } else {
        setUserText('...GPTStudent is writing based on feedback...');
        incorporateFeedback(userText, feedback).then((newText) => {
          setUserText(newText);
        });
      }
    }
  }, [feedback, devToolOn]);

  useEffect(() => {
    if (isAutoFeedback) {
      startInterval();
    } else {
      setSentenceCount(0);
      clearInterval(intervalId);
    }   
  }, [isAutoFeedback]);

  useEffect(() => {
    if (sentenceCount === MAX_SENTENCES) {
      setSentenceCount(0);
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
      setSentenceCount(0);
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
    });
  };

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
        <ToastContainer hideProgressBar autoClose={2000}/>
      </div>
    </>
  );
}

export default App;
