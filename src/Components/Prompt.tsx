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
        textCompletion('User: Give a prompt for a creative writing assignment\nAssistant: ', 100).then((res) => {
            setPrompt(res)
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
