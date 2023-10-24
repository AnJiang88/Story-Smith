const CHAT_COMPLETION = 'chatCompletion';

type ChatConversation = Array<
  {
    role: string,
    content: string
  }
>;

const getChatCompletion = async (conversation: ChatConversation, maxTokens: number): Promise<string> => {
  const data = {
    modelId: 'gpt-3.5-turbo',
    configuration: {
      temperature: 0.8,
      maxTokens: maxTokens
    },
    conversation
  }

  const response = await fetch(`${process.env.REACT_APP_OPENAI_API_URL}/${CHAT_COMPLETION}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData.assistantMessage.content;
};

export default getChatCompletion;
