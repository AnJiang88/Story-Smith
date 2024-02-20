import getTextCompletion from "./textCompletion";
import getChatCompletion from "./chatCompletion";
import trimQuotes from "../utils/trimQuotes";

export async function generatePrompt(prompt: string, maxTokens=512) {
  const input = `User:\n${prompt}\n\nAssistant:\n`;
  const result = await getTextCompletion(input, maxTokens);
  return trimQuotes(result);
}

export async function getFeedback(prompt: string, draft: string, maxTokens=1024) {
  const systemMessage = {
    role: 'system',
    content: `Imagine you are a writing coach collaborating with a student on a creative project.
    The student has started a story, essay, or any piece of writing, and they need your guidance to enhance their work.
    Provide constructive feedback, suggestions, and ideas to help the student improve their writing.
    Focus on areas such as clarity, organization, creativity, and language use.
    Point out strengths in their writing and offer specific advice on how they can build on those strengths.
    Encourage them to explore new perspectives, expand on their ideas, and refine their arguments.
    Your goal is to empower the student to develop their writing skills by providing thoughtful and insightful guidance.
    Be supportive, encouraging, and specific in your feedback, helping the student to become a better writer.`
  }
  const userMessage1 = {
    role: 'user',
    content: `Hi, here is the prompt that I'm writing about: ${prompt}
    Here is what I've written so far. ${draft}
    Please assist me in my writing process without writing on behalf of me.`
  }
  const assistantMessage = {
    role: 'assistant',
    content: await getChatCompletion([systemMessage, userMessage1], maxTokens)
  }
  const userMessage2 = {
    role: 'user',
    content: `Summarize the feedback above into a concise summary that is 100 words long.`
  }

  return getChatCompletion([systemMessage, userMessage1, assistantMessage, userMessage2], maxTokens);
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
