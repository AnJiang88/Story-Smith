import React, { useEffect, useState, FC, ReactEventHandler, useCallback } from 'react';
import { generatePrompt } from '../../api/api';
import './prompt.scss';

interface PromptProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const Prompt: FC<PromptProps> = ({ prompt, setPrompt }) => {
  const [loadingPrompt, setLoadingPrompt] = useState(false);

  const generateNewPrompt = useCallback(() => {
    setLoadingPrompt(true);
    generatePrompt('Give a prompt for a creative writing assignment', 100).then((promptResponse) => {
      setPrompt(promptResponse);
      setLoadingPrompt(false);
    });
  }, [setLoadingPrompt, setPrompt])

  // When we finish the app, we can uncomment this, but for now we should avoid making this request unless we want to
  // useEffect(() => {
  //     generateNewPrompt()
  // }, [generateNewPrompt])

  useEffect(() => {
    setPrompt('Write a story about a world where humans have the ability to communicate with animals.')
  }, [setPrompt]);

  const onGeneratePrompt: ReactEventHandler<HTMLButtonElement> = () => {
    generateNewPrompt()
  };

  return (
    <div className="main-prompt">
      {!loadingPrompt && <p style={{color: 'white'}}>{prompt}</p>}
      {loadingPrompt && <p style={{color: 'orange'}}>Loading prompt...</p>}
      <button onClick={onGeneratePrompt}>Generate New Prompt</button>
    </div>
  );
};

export default Prompt;
