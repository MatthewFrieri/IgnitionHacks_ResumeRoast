import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { promptGemini } from "./api/gemini";
import { getAudio } from "./api/elevenlabs";
import Crunker from "crunker";

export default function Roast() {
  const location = useLocation();
  const resumeText = location.state?.resumeText;
  const [lyrics, setLyrics] = useState("...");
  const [dissAudio, setDissAudio] = useState();
  const drakeVoiceID = "9VZnLb0qx35CBHf8XXqS";
  let crunker = new Crunker({ sampleRate: 48000 });

  useEffect(() => {
    if (resumeText !== undefined) {
      const prompt = `I want you to write a diss track for my resume as Drake. 
        Make it clear Drake is dissing my resume. Targetting specific pieces of 
        information from it (or information missing). Dont comment on any bad formatting 
        or random characters. Write 4 verses of 4 lines each. ${resumeText}`;

      promptGemini(prompt, setLyrics);
    }
  }, [resumeText]);

  useEffect(() => {
    if (lyrics) {
      console.log(lyrics);

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

      const drakeRoast = new Audio("DrakeRoast.mp3");
      const bblDrizzy = new Audio("BBLDrizzy.mp3");

      async function buildAudio(voice, track) {
        const voiceAudio = await audioElementToAudioBuffer(voice);
        const trackBuffer = await audioElementToAudioBuffer(track);
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
        document.body.append(output.element);

        crunker.notSupported(() => {
          // Handle no browser support
        });
      }

      buildAudio(drakeRoast, bblDrizzy);
      // Usage
      // audioElementToAudioBuffer(drakeRoast).then((audioBuffer) => {
      //   return audioBuffer; // Now you have your AudioBuffer
      // });
      //getAudio(lyrics, drakeVoiceID, setDissAudio);
    }
  }, [lyrics]);

  useEffect(() => {
    if (dissAudio) {
      //dissAudio.play();
    }
  }, [dissAudio]);

  return (
    <div>
      <h1>roast page</h1>
      <p>{lyrics}</p>
    </div>
  );
}
