import { FC } from 'react';
import './feedback.scss';

interface FeedbackBubbleProps {
  text: string;
}

const FeedbackBubble: FC<FeedbackBubbleProps> = ({ text }) => {
  return (
    <div className="feedback-bubble">
      {text}
    </div>
  );
};

export default FeedbackBubble;
