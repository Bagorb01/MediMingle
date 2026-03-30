// composables/useVoiceSession.ts
import { ref } from "vue";
import {
  RealtimeAgent,
  RealtimeSession,
  type RealtimeItem,
} from "@openai/agents/realtime";
import hraPrompt from "~~/server/data/prompts/hra";

const history = ref<RealtimeItem[]>([]);
const isConnected = ref(false);
const isConnecting = ref(false);
const error = ref<Error | null>(null);

let session: RealtimeSession | null = null;

export function useVoiceSession() {
  async function fetchToken(): Promise<string> {
    const { value } = await $fetch<{ value: string }>("/api/openAI/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {},
    });
    return value;
  }

  async function connect() {
    isConnecting.value = true;
    error.value = null;

    try {
      const agent = new RealtimeAgent({
        name: "medi-mingle",
        instructions: hraPrompt,
        voice: "marin",
      });

      session = new RealtimeSession(agent, {
        config: {
          inputAudioTranscription: {
            model: "gpt-4o-mini-transcribe",
          },
        },
      });

      session.on("history_updated", (updatedHistory) => {
        history.value = [...updatedHistory];
      });

      const token = await fetchToken();
      await session.connect({ apiKey: token });

      isConnected.value = true;
      console.log("You are connected!");
    } catch (e) {
      error.value = e as Error;
      console.error(e);
    } finally {
      isConnecting.value = false;
    }
  }

//   function disconnect() {
//     session = null;
//     isConnected.value = false;
//     history.value = [];
//   }

  return {
    history,
    isConnected,
    isConnecting,
    error,
    connect,
    // disconnect,
  };
}