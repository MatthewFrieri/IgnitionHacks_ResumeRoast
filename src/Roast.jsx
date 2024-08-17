import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { promptGemini } from "./api/gemini";
import { getAudio } from "./api/elevenlabs";

export default function Roast() {
  const location = useLocation();
  const resumeText = location.state?.resumeText;
  const [lyrics, setLyrics] = useState("...");
  const [dissAudio, setDissAudio] = useState();
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
      console.log(lyrics);
      // getAudio(lyrics, drakeVoiceID, setDissAudio);
    }
  }, [lyrics]);

  useEffect(() => {
    if (dissAudio) {
      dissAudio.play();


      
    }
  }, [dissAudio]);

  return (
    <div>
      <h1>roast page</h1>
      <p>{lyrics}</p>
    </div>
  );
}
