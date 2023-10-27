import getTextCompletion from "./textCompletion";
import getChatCompletion from "./chatCompletion";

export async function generatePrompt(prompt: string, maxTokens=512) {
  const input = `User:\n${prompt}\n\nAssistant:\n`;
  return getTextCompletion(input, maxTokens);
}

export async function getFeedback(writing_assignment: string, draft: string, maxTokens=1024) {
  
  const prompt = `You are a helpful assistant for a student writing a draft based on the following writing assignment: ${writing_assignment}.
  Use concise expression to provide constructive pointers and suggestions in a single paragraph to help the student improve their writing.
  The pointers and suggestions need to be specific to the content of the draft and explain how and why they can be improved on the aspects of creative story idea, descriptive details, and word choice. 
  The whole feedback needs to be within 100 words.
  Avoid writing for the student.`;

  return getTextCompletion(prompt, maxTokens);
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
