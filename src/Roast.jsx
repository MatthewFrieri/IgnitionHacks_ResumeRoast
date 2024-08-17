import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { promptGemini } from "./api/gemini";
import { getAudio } from "./api/elevenlabs";

export default function Roast() {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeText = location.state?.resumeText;
  const file = location.state?.pdf;
  const [lyrics, setLyrics] = useState("");
  const [dissAudio, setDissAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const drakeVoiceID = "9VZnLb0qx35CBHf8XXqS";

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
      getAudio(lyrics, drakeVoiceID, setDissAudio);
    }
  }, [lyrics]);

  useEffect(() => {
    if (dissAudio) {
      dissAudio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
  }, [dissAudio]);

  const playAudio = () => {
    dissAudio.play();
    setHasPlayedOnce(true);
    setIsPlaying(true);
  };

  return (
    <div className="relative bg-gradient-to-b from-zinc-700 to-zinc-900 w-screen h-screen overflow-hidden">
      <span className="flex gap-10 p-10">
        <i
          className="text-5xl text-white cursor-pointer fa-house fa-solid"
          onClick={() => {
            navigate("/");
          }}
        />
        {dissAudio && (
          <i
            className="text-5xl text-white cursor-pointer fa-download fa-solid"
            onClick={() => {}}
          />
        )}
      </span>
      <img
        src="outlined-drake.png"
        className="bottom-12 left-20 absolute scale-125"
      />
      <div className="top-20 right-40 absolute">
        <div className="relative flex justify-center items-center border-4 border-white bg-zinc-400 p-10 rounded-xl w-[40rem] h-[30rem]">
          {dissAudio ? (
            hasPlayedOnce ? (
              <p className="font-roboto">{lyrics}</p>
            ) : (
              <i
                onClick={playAudio}
                className="text-8xl text-white fa-play fa-solid"
              ></i>
            )
          ) : (
            <div className="border-4 border-t-transparent border-blue-500 border-solid rounded-full w-12 h-12 animate-spin b"></div>
          )}
          {!isPlaying && hasPlayedOnce && (
            <i
              onClick={playAudio}
              className="fa-rotate-right right-8 bottom-8 absolute text-4xl text-white fa-solid"
            ></i>
          )}
        </div>
      </div>

      <p
        onClick={() => {
          navigate("/feedback" , {state : {pdf : file}});
        }}
        className="right-10 bottom-10 absolute text-3xl text-white cursor-pointer"
      >
        Get help →
      </p>
    </div>
  );
}
