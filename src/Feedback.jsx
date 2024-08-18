import { useLocation, useNavigate } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useState, useEffect } from "react";
import { promptGemini } from "./api/gemini";
import { getAudio } from "./api/elevenlabs";

export default function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeText = location.state?.resumeText;
  const pdfData = location.state?.pdfData;
  const kendrickVoiceID = "MOrJbx3jEEhp0z50jgLG";

  const [feedback, setFeedback] = useState("");
  const [script, setScript] = useState("");
  const [kendrickAudio, setKendrickAudio] = useState();

  useEffect(() => {
    if (resumeText !== undefined) {
      const prompt = `Look at my resume and provide some feedback that can
      help improve it. Make sure none of your feedback points are about formatting.
      List out 5 feedback points that are one sentence each.
      IT IS IMPORTANT THAT THEY ARE SHORT FEEDBACK POINTS. 
      Format them like this: # feedback point one # feedback point two ...
      Resume: ${resumeText}`;

      promptGemini(prompt, setFeedback);
    }
  }, [resumeText]);

  useEffect(() => {
    if (feedback) {
      const prompt = `You are Kendrick Lamar. I am going to give you a resume
      with some feedback on how to make it better. Write me a script talking as if
      you are Kendrick Lamar elaborating on each feedback point. Feedback: ${feedback} 
      Resume: ${resumeText}`;

      promptGemini(prompt, setScript);
    }
  }, [feedback]);

  useEffect(() => {
    if (script) {
      getAudio(script, kendrickVoiceID, setKendrickAudio, "not like us");
    }
  }, [script]);

  const playAudio = () => {
    kendrickAudio.play();
    // setHasPlayedOnce(true);
    // setIsPlaying(true);
  };

  let pdfUrl = null;
  if (pdfData) {
    const pdfBlob = new Blob(
      [
        new Uint8Array(
          atob(pdfData)
            .split("")
            .map((char) => char.charCodeAt(0))
        ),
      ],
      { type: "application/pdf" }
    );
    pdfUrl = URL.createObjectURL(pdfBlob);
  }

  return (
    <div className="relative bg-gradient-to-b from-zinc-700 to-zinc-900 w-screen h-screen overflow-hidden">
      {kendrickAudio && (
        <button
          onClick={playAudio}
          className="bg-green-400 rounded-full w-10 h-10"
        >
          PLAY
        </button>
      )}
      {/* <div className="right-0 z-10 absolute bg-red-500 w-10 h-screen" /> */}
      {/* <div className="z-10 absolute bg-red-500 w-10 h-screen" /> */}
      <div className="relative ml-10 w-[36rem] h-[44.5rem]">
        {pdfUrl && <Viewer fileUrl={pdfUrl} />}
      </div>
      <i
        className="m-10 text-5xl text-white cursor-pointer fa-house fa-solid"
        onClick={() => {
          navigate("/");
        }}
      />
      <img
        src="kdot.png"
        className="right-10 -bottom-3 absolute w-[30rem]"
      ></img>
    </div>
  );
}
