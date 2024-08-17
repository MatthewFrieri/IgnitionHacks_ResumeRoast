import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { promptGemini } from "./api/gemini";
import { getAudio } from "./api/elevenlabs";
import Crunker from "crunker";

export default function Roast() {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeText = location.state?.resumeText;
  const [lyrics, setLyrics] = useState("");
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

  const playAudio = () => {
    dissAudio.play();
  };
  useEffect(() => {
    if (dissAudio) {
      //dissAudio.play();
    }
  }, [dissAudio]);

  return (
    <div className="relative bg-gradient-to-b from-zinc-700 to-zinc-900 w-screen h-screen overflow-hidden">
      <span className="flex gap-10 p-10">
        <i
          className="text-5xl text-white cursor-pointer fa-house fa-solid"
          onClick={() => {
            navigate("/");
          }}
        />
        <i
          className="text-5xl text-white cursor-pointer fa-download fa-solid"
          onClick={() => {}}
        />
      </span>
      <img
        src="outlined-drake.png"
        className="bottom-12 left-20 absolute scale-125"
      />
      <div className="top-20 right-40 absolute">
        <div className="flex justify-center items-center border-4 border-white bg-zinc-400 p-10 rounded-xl w-[40rem] h-[30rem]">
          {lyrics ? (
            <p>{lyrics}</p>
          ) : (
            <div className="border-4 border-t-transparent border-blue-500 border-solid rounded-full w-12 h-12 animate-spin b"></div>
          )}
        </div>
      </div>
      {!dissAudio && (
        <div className="bottom-10 left-[25rem] absolute flex justify-center items-center border-4 bg-white border-blue-500 rounded-full w-16 h-16">
          <i class="text-4xl text-blue-500 fa-play fa-solid"></i>
        </div>
      )}
      <p
        onClick={() => {
          navigate("/feedback");
        }}
        className="right-10 bottom-10 absolute text-3xl text-white cursor-pointer"
      >
        Get help →
      </p>
    </div>
  );
}
