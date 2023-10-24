import getTextCompletion from "./textCompletion";
import getChatCompletion from "./chatCompletion";

export async function textCompletion(prompt: string, maxTokens=512) {
  const input = `User:\n${prompt}\n\nAssistant:\n`;
  return getTextCompletion(input, maxTokens);
}

const systemPrimer = `You are helping a student write a creative story...
... TODO
The prompt for the story is: `;

export async function chatCompletion(prompt: string, draft: string, maxTokens=512) {
  const systemMessage = {
    role: 'system',
    content: systemPrimer + prompt
  }
  const userMessage = {
    role: 'user',
    content: draft
  }
  return getChatCompletion([systemMessage, userMessage], maxTokens);
}
