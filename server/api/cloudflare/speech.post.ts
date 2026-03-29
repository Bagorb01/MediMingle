// server/api/speak.post.ts
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const body = await readBody(event)

  const audioStream = await cloudflare.env.AI.run(
    '@cf/deepgram/aura-2-en',
    { speaker: "thalia",text: String(body.text) }
  ) as ReadableStream
  
  return new Response(audioStream, {
    headers: { 'Content-Type': 'audio/mpeg' }
  })
})