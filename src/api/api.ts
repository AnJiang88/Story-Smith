import getTextCompletion from "./textCompletion";
import getChatCompletion from "./chatCompletion";

export async function textCompletion(prompt: string, maxTokens=512) {
  const input = `User:\n${prompt}\n\nAssistant:\n`;
  return getTextCompletion(input, maxTokens);
}

const systemPrimer = "You are my helpful assistant for writing a creative story. Read my creative writing and analyze it to see how it answers the prompt. Provide me constructive suggestions to help me improve my writing. Focus on giving me specific details, structure, and clarity. Give your response in short senteces and don't give me more than 40 words."

export async function chatCompletion(prompt: string, draft: string, maxTokens=512) {
  const systemMessage = {
    role: 'system',
    content: systemPrimer + prompt
  }
  const promptMessage = {
    role: 'user',
    content: "This is my prompt: " + prompt
  }
  const userMessage = {
    role: 'user',
    content: "Here is my draft:\n\n" + draft
  }
  return getChatCompletion([systemMessage, promptMessage, userMessage], maxTokens);
}
