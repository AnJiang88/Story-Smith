import getTextCompletion from "./textCompletion";
import getChatCompletion from "./chatCompletion";

export async function generatePrompt(prompt: string, maxTokens=512) {
  const input = `User:\n${prompt}\n\nAssistant:\n`;
  return getTextCompletion(input, maxTokens);
}

const rubric = `Descriptors:
  -Ideas
  Strong and creative story idea; specific, descriptive details; use of plot, setting, characters, conflict, and dialogue 
  -Organization
  Unified structure, clear direction, and clever transitions 
  -Word Choice
  Precise, rich language that expresses ideas and engages the reader
  -Sentence Fluency and Voice
  Rhythmic and flowing language, varied sentences, and unique perspective with ideas and details to appeal to the audience
  -Conventions
  Mechanical and grammatical accuracy`;

export async function getFeedback(writing_assignment: string, draft: string, maxTokens=1024) {
  
  const prompt = `You are a helpful assistant for a student writing a story based on the following writing assignment: ${writing_assignment}.
  Use concise expression and less than 15 words to provide no more than 5 constructive pointers and suggestions to help the student improve their writing.
  Focus on creativity inspiration and the descriptors in the following rubric and reference the rubric: ${rubric}. 
  The following is the student's draft: ${draft}
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
