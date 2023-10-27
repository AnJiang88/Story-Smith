import React, { useState, useEffect } from 'react'
import Prompt from './components/prompt/Prompt';
import UserInput from './components/userInput/UserInput';
import FeedbackBubble from './components/feedback/FeedbackBubble';
import './App.scss';
import { getFeedback, incorporateFeedback, writeStory } from './api/api';
import useKeybind from './hooks/useKeybind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/storysmith-icon.png'

const MAX_SENTENCES = 3;

const devToolKeybindCondition = (event: KeyboardEvent) => event.altKey && event.shiftKey && event.code === "KeyW";

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [userText, setUserText] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('Welcome to StorySmith! Start writing your story in the textbox. When you are ready for feedback, click the "Get Feedback Now" button below, or select "Enable Autofeedback" to receive regular updates on how you\'re doing.');
  const [isAutoFeedback, setIsAutoFeedback] = useState(false);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [feedbackIndicator, setFeedbackIndicator] = useState(false);
  
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
    setFeedbackIndicator(false);
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
    setFeedbackIndicator(true);
    getFeedback(prompt, userText, 512).then((aiFeedback) => {
      setFeedback(aiFeedback);
      setFeedbackIndicator(false);
    });
  };

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
                isLoading={feedbackIndicator}
              />
            </div>
            <div className="right-content">
              {feedback && <FeedbackBubble text={feedback} />}
            </div>
          </div>
        </section>
        <ToastContainer hideProgressBar autoClose={2000}/>
      </div>
    </>
  );
}

export default App;
