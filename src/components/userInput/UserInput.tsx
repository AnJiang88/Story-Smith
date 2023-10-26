import React, { ChangeEvent } from 'react';

interface UserInputProps {
  userText: string;
  setUserText: React.Dispatch<React.SetStateAction<string>>;
  sentenceCount: number;
  setSentenceCount: React.Dispatch<React.SetStateAction<number>>;
  onSubmitText: (event: React.FormEvent) => void;
  isAutoFeedback: boolean;
  setIsAutoFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserInput: React.FC<UserInputProps> = ({
  userText,
  setUserText,
  sentenceCount,
  setSentenceCount,
  onSubmitText,
  isAutoFeedback,
  setIsAutoFeedback,
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
        rows={25}
        cols={50}
      />
      <button className="submit-button" onClick={onSubmitText}>
        Get Feedback Now
      </button>
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
    </div>
  );
};

export default UserInput;
