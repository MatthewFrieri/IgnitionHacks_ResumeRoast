import axios from "axios";

export async function getAudio(text, voiceId, setAudio) {
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    { text },
    {
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
      },
      responseType: "blob",
    }
  );

  const audio = new Audio(URL.createObjectURL(response.data));
  setAudio(audio)
}
