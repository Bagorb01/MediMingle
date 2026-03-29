// server/api/transcribe.post.ts
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const formData = await readFormData(event)
  const audio = formData.get('audio') as File

  const arrayBuffer = await audio.arrayBuffer()
  const audioArray = [...new Uint8Array(arrayBuffer)]

  const result = await cloudflare.env.AI.run(
    '@cf/openai/whisper-large-v3-turbo',
    { audio: audioArray }
  )

  return { text: result.text }
})