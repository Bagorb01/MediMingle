export interface ChatMessage {
  isPatient?: boolean;
  message?: string;
}

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  const { response } = await $fetch<{ response: string }>("/api/cloudflare/chat", {
    method: "POST",
    body: { messages },
  });
  return response;
}

export async function synthesize(text: string): Promise<void> {
  const response = await fetch("/api/cloudflare/speech", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(new Blob([blob], { type: "audio/mpeg" }));
  const audio = new Audio(url);

  audio.play();
  audio.onended = () => URL.revokeObjectURL(url);
}