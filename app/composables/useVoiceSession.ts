// composables/useVoiceSession.ts
import { ref } from "vue";
import {
  RealtimeAgent,
  RealtimeSession,
  type RealtimeItem,
} from "@openai/agents/realtime";
import hraPrompt from "~~/server/data/prompts/hra";

const history = ref<RealtimeItem[]>([]);
const isConnected = ref<boolean>(false);
const isConnecting = ref<boolean>(false);
const isMicMuted = ref<boolean>(true);
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
    isMicMuted.value = false;
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
          model: "gpt-realtime-mini",
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

  function muteMic() {
    isMicMuted.value = !isMicMuted.value;

    if (session) {
      session.mute(isMicMuted.value);
    } else {
      console.warn("No active session to mute/unmute microphone.");
    }
  }

  function disconnect() {
    if (session) {
      session.close();
      session = null;
      isConnected.value = false;
      history.value = [];
    }
  }

  return {
    history,
    isMicMuted,
    isConnected,
    isConnecting,
    error,
    muteMic,
    connect,
    disconnect,
  };
}
