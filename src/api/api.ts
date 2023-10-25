import getTextCompletion from "./textCompletion";
import getChatCompletion from "./chatCompletion";

export async function textCompletion(prompt: string, maxTokens=512) {
  const input = `User:\n${prompt}\n\nAssistant:\n`;
  return getTextCompletion(input, maxTokens);
}

const systemPrimer = "You are a helpful assistant for a student writing an essay. Provide constructive pointers and suggestions to help the student improve their writing. Focus on specific details, structure, and clarity. Avoid writing full sentences."


export async function chatCompletion(prompt: string, draft: string, maxTokens=512) {
  const systemMessage = {
    role: 'system',
    content: systemPrimer + prompt
  };
  const userMessage = {
    role: 'user',
    content: draft
  };
  return getChatCompletion([systemMessage, userMessage], maxTokens);
}
