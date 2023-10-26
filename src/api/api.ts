import getTextCompletion from "./textCompletion";
import getChatCompletion from "./chatCompletion";

export async function textCompletion(prompt: string, maxTokens=512) {
  const input = `User:\n${prompt}\n\nAssistant:\n`;
  return getTextCompletion(input, maxTokens);
}

const systemPrimer = "You are an assistant for a student writing a creative story. They will ask for feedback, and you will respond with feedback without giving them full sentences."

export async function chatCompletion(prompt: string, draft: string, maxTokens=512) {
  const systemMessage = {
    role: 'system',
    content: systemPrimer
  }
  const userMessage = {
    role: 'user',
    content: `Hi, here is my prompt that I'm writing about: ${prompt}\nHere is what I've written so far. Could you look over it and give specific feedback regarding grammar, sentence flow, and puncuation?\n\n${draft}`
  }
  return getChatCompletion([systemMessage, userMessage], maxTokens);
}

export async function writeStory(prompt: string, maxTokens=1024) {
  return await getTextCompletion(prompt + " (with only 3 paragraphs):\n", maxTokens);
}

export async function incorporateFeedback(currentUserInput: string, gptFeedback: string): Promise<string> {
  const prompt =
`This is a story that has been written
${currentUserInput}

Following the advice of this feedback:
${gptFeedback}

The story was edited to instead be:
`;

  return await getTextCompletion(prompt, 1024);
}
