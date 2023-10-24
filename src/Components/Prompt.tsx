import React, { useEffect, useState, FC, ReactEventHandler } from 'react';
import { textCompletion } from '../api/api';

interface PromptProps {
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const Prompt: FC<PromptProps> = ({ prompt, setPrompt }) => {
    const [loadingPrompt, setLoadingPrompt] = useState(false);

    useEffect(() => {
        console.log("hi")
        generateNewPrompt()
    }, [])

    const onGeneratePrompt: ReactEventHandler<HTMLButtonElement> = () => {
        generateNewPrompt()
    };

    function generateNewPrompt() {
        setLoadingPrompt(true);
        textCompletion('Give a prompt for a creative writing assignment', 100).then((promptResponse) => {
            setPrompt(promptResponse)
            setLoadingPrompt(false);
        });
    }

    return (
        <div>
            {!loadingPrompt && <p>{prompt}</p>}
            {loadingPrompt && <p style={{color: 'orange'}}>Loading prompt...</p>}
            <button onClick={onGeneratePrompt}>Generate New Prompt</button>
        </div>
    );
};

export default Prompt;
