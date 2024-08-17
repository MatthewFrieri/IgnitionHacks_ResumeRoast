import axios from "axios";

export async function getAudio(text, voiceId) {
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    { text },
    {
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": "sk_ec7129b7b02cf0dad182fc0a45f51201b0c5e62c0163a8d1",
      },
      responseType: "blob",
    }
  );

  const audio = new Audio(URL.createObjectURL(response.data));
  return audio;
}
