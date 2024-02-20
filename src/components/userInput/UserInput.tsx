import React, { ChangeEvent } from 'react';
import './userInput.scss';
import { SpinnerCircular } from 'spinners-react';

interface UserInputProps {
  userText: string;
  setUserText: (text: string) => void;
  sentenceCount: number;
  setSentenceCount: React.Dispatch<React.SetStateAction<number>>;
  onSubmitText: (event: React.FormEvent) => void;
  isAutoFeedback: boolean;
  setIsAutoFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const UserInput: React.FC<UserInputProps> = ({
  userText,
  setUserText,
  sentenceCount,
  setSentenceCount,
  onSubmitText,
  isAutoFeedback,
  setIsAutoFeedback,
  isLoading: isLoading,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let text = event.target.value;
    setUserText(text);

    if (isAutoFeedback && (text.endsWith('.') || text.endsWith('!') || text.endsWith('?'))) {
      setSentenceCount(sentenceCount + 1)
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAutoFeedback(event.target.checked);
  };

  return (
    <div className="main-userinput">
      <textarea
        className="user-input"
        value={userText}
        onChange={handleInputChange}
      />
      <div className="controls">
        <div>
          <label>
            <input
              type="checkbox"
              checked={isAutoFeedback}
              onChange={handleCheckboxChange}
            />
            Enable AutoFeedback
          </label>
        </div>
        <div className="feedback">
          <SpinnerCircular className="spinner" color={"#8AE8E9"} secondaryColor={"#666666"} size={30} thickness={175} enabled={isLoading}/>
          <button className="submit-button" onClick={onSubmitText} disabled={isLoading}>
            Get Feedback Now
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default UserInput;
