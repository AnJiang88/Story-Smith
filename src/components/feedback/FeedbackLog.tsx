import { FC } from 'react';
import './feedback.scss';
// @ts-ignore
import FeedbackBubble from "./FeedbackBubble";

interface FeedbackLogProps {
    feedbackLog: string[]
}


const FeedbackLog: FC<FeedbackLogProps> = ({ feedbackLog }) => {
    return (
        <div className="feedback-log" id="feedback-log">
            {feedbackLog.map((feedback, index) => (
                <FeedbackBubble key={index} text={feedback} />
            ))}
        </div>
    );
}

export default FeedbackLog;
