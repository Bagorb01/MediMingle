// server/api/chat.post.ts
import { hraQuestions } from "../../data/questionnaires/hra";

export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context;
  const { messages } = await readBody(event);

  const questionList = hraQuestions
    .map((q, i) => `${i + 1}. ${q}`)
    .join('\n')

  const result = await cloudflare.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [
      {
        role: "system",
        content: `You are a friendly medical intake assistant, named Mindy, conducting a patient interview.
First, introduce yourself, state your purpose, and then work through these questions in order:
${questionList}

Rules:
- Ask one question at a time.
- Respond naturally and empathetically before moving on.
- If an answer is unclear, ask a follow-up before proceeding.
- When all questions are answered, say "Thank you, that's all the information I need" and summarize what was shared.
- Keep responses concise — this will be read aloud.`,
      },
      ...messages,
    ],
  });

  return { response: result.response };
});
