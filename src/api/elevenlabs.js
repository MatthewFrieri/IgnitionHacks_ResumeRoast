import axios from "axios";
import Crunker from "crunker";

export async function getAudio(text, voiceId, setFinalAudio, song) {

  console.log('audio api call');
  
  // const response = await axios.post(
  //   `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
  //   { text: text },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
  //     },
  //     responseType: "blob",
  //   }
  // );
  
  // const rapperAudio = new Audio(URL.createObjectURL(response.data));
  

  let backgroundSong = null
  let rapperAudio = null
  if (song === 'bbl drizzy') {
    rapperAudio = new Audio('DrakeRoast.mp3')
    backgroundSong = new Audio('BBLDrizzy.mp3')
  } else if (song === 'not like us') {
    rapperAudio = new Audio('kendrickAdvice.mp3')
    backgroundSong = new Audio('notLikeUs.mp3')
  }

  console.log('background song');
  console.log(backgroundSong);
  
  

  const finalAudio = await buildAudio(rapperAudio, backgroundSong, song)
  setFinalAudio(finalAudio)
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
