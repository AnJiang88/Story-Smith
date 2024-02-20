const TEXT_COMPLETION = 'textCompletion';

const getTextCompletion = async (input: string, maxTokens: number): Promise<string> => {
  const data = {
    modelId: 'gpt-3.5-turbo-instruct',
    configuration: {
      temperature: 0.8,
      maxTokens: maxTokens
    },
    input
  };

  const response = await fetch(`${process.env.REACT_APP_OPENAI_API_URL}/${TEXT_COMPLETION}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData.answer;
};

export default getTextCompletion;
