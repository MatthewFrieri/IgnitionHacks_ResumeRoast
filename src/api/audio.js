import axios from "axios";
import Crunker from "crunker";

export async function getAudio(text, voiceId, setFinalAudio, song) {  
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    { text: text },
    {
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
      },
      responseType: "blob",
    }
  );
  
  const rapperAudio = new Audio(URL.createObjectURL(response.data));

  let backgroundSong = null

  if (song === 'bbl drizzy') {
    backgroundSong = new Audio('audios/BBLDrizzy.mp3')
  } else if (song === 'not like us') {
    backgroundSong = new Audio('audios/notLikeUs.mp3')
  }

  const finalAudio = await buildAudio(rapperAudio, backgroundSong, song)
  setFinalAudio(finalAudio)
}


async function audioElementToAudioBuffer(audioElement) {
  const audioContext = new (window.AudioContext ||
    window.webkitAudioContext)();

  const response = await fetch(audioElement.src);
  const arrayBuffer = await response.arrayBuffer();

  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  return audioBuffer;
}


async function buildAudio(voice, track, song) {

  let delay = 0;
  if (song === 'bbl drizzy') {
    delay = 6.3;
  } else if (song === 'not like us') {
    delay= 4.9;
  }
  
  const voiceAudio = await audioElementToAudioBuffer(voice);
  const trackBuffer = await audioElementToAudioBuffer(track);
  
  const crunker = new Crunker({ sampleRate: voiceAudio.sampleRate });

  const voiceBuffer = crunker.padAudio(voiceAudio, 0, delay);
  const merged = crunker.mergeAudio([trackBuffer, voiceBuffer]);
  const cut = crunker.sliceAudio(
    merged,
    0,
    voiceBuffer.duration + 5,
    7,
    5
  );

  const output = crunker.export(cut, "audio/mp3");
  return output.element
}
