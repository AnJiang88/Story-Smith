import React, { ChangeEvent } from 'react';

interface UserInputProps {
  userText: string;
  setUserText: React.Dispatch<React.SetStateAction<string>>;
  onSubmitText: (event: React.FormEvent) => void;
}

const UserInput: React.FC<UserInputProps> = ({ userText, setUserText, onSubmitText }) => {

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(event.target.value);
  };

  return (
    <div>
      <textarea
        className="user-input"
        value={userText}
        onChange={handleInputChange}
        rows={25}
        cols={50}
      />
      <button className="submit-button" onClick={onSubmitText}>Submit</button>
    </div>
  );
};

export default UserInput;
