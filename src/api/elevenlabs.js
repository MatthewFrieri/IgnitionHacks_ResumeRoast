import axios from "axios";
import Crunker from "crunker";

export async function getAudio(text, voiceId, setDissAudio) {
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    { text: "e" },
    {
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
      },
      responseType: "blob",
    }
  );
  
  const drakeAudio = new Audio(URL.createObjectURL(response.data));
  // const drakeAudio = new Audio('DrakeRoast.mp3')
  const bblDrizzy = new Audio('BBLDrizzy.mp3')

  const finalAudio = await buildAudio(drakeAudio, bblDrizzy)

  setDissAudio(finalAudio)
}


async function audioElementToAudioBuffer(audioElement) {
  const audioContext = new (window.AudioContext ||
    window.webkitAudioContext)();

  // Fetch the audio data
  const response = await fetch(audioElement.src);
  const arrayBuffer = await response.arrayBuffer();

  // Decode the audio data into an AudioBuffer
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  return audioBuffer;
}


async function buildAudio(voice, track) {

  const voiceAudio = await audioElementToAudioBuffer(voice);
  const trackBuffer = await audioElementToAudioBuffer(track);

  const crunker = new Crunker({ sampleRate: voiceAudio.sampleRate });

  const voiceBuffer = crunker.padAudio(voiceAudio, 0, 6.3);
  const merged = crunker.mergeAudio([trackBuffer, voiceBuffer]);
  const cut = crunker.sliceAudio(
    merged,
    0,
    voiceBuffer.duration + 5,
    7,
    5
  );
  console.log(merged);
  const output = crunker.export(cut, "audio/mp3");
  //crunker.download(output.blob);

  console.log('OUTPUT');
  console.log(output);
  
  return output.element
}
