import React, { useState, useEffect } from 'react'
import Prompt from './components/prompt/Prompt';
import UserInput from './components/userInput/UserInput';
import FeedbackLog from './components/feedback/FeedbackLog';
import './App.scss';
import { chatCompletion, incorporateFeedback, writeStory } from './api/api';
import useKeybind from './hooks/useKeybind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/storysmith-icon.png'

const MAX_SENTENCES = 3;

const devToolKeybindCondition = (event: KeyboardEvent) => event.altKey && event.shiftKey && event.code === "KeyW";

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [userText, setUserText] = useState<string>('');
  const [feedbackLog, setFeedbackLog] = useState<string[]>(['Welcome to StorySmith! Start writing your story in the textbox. When you are ready for feedback, click the "Get Feedback Now" button below, or select "Enable Autofeedback" to receive regular updates on how you\'re doing.']);
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

      if (!feedbackLog || !userText) {
        setUserText('...GPTStudent is writing a story based on the prompt...');
        writeStory(prompt).then((gptStory) => {
          setUserText(gptStory)
        });
      } else {
        setUserText('...GPTStudent is writing based on feedback...');
        incorporateFeedback(userText, feedbackLog[feedbackLog.length-1]).then((newText) => {
          setUserText(newText);
        });
      }
    }
  }, [feedbackLog, devToolOn]);

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
      setFeedbackLog([...feedbackLog, aiFeedback]);
      scrollToBottom('feedback-log');
    })
  }

  const scrollToBottom = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollTo(0, element.scrollHeight);
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
            <div className="right-content">
              <FeedbackLog feedbackLog={feedbackLog}/>
            </div>
          </div>
        </section>
        <ToastContainer hideProgressBar autoClose={2000}/>
      </div>
    </>
  );
}

export default App;
