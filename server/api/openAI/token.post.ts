export default defineEventHandler(async (event) => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "OPENAI_API_KEY is not configured",
    });
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: {
            type: "realtime",
            model: "gpt-realtime"
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
