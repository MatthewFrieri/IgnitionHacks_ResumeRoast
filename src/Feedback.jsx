import { useLocation, useNavigate } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useState, useEffect } from "react";
import { promptGemini } from "./api/gemini";
import { getAudio } from "./api/audio";
import "./styles/main.css";

export default function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeText = location.state?.resumeText;
  const pdfData = location.state?.pdfData;
  const kendrickVoiceID = "MOrJbx3jEEhp0z50jgLG";

  const [feedback, setFeedback] = useState("");
  const [displayFeedback, setDisplayFeedback] = useState([]);
  const [script, setScript] = useState("");
  const [kendrickAudio, setKendrickAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    if (resumeText !== undefined) {
      const prompt = `Look at my resume and provide some feedback that can
      help improve it. Make sure none of your feedback is about formatting.
      List out 5 feedback points that are one sentence each.
      IT IS IMPORTANT THAT EACH FEEDBACK POINT IS ONE SENTENCE.
      IT IS IMPORTANT THAT THEY ARE SHORT FEEDBACK POINTS. 
      Format them like this: # feedback point one # feedback point two ...
      IT IS CRUCIAL THAT YOU FOLLOW THE EXAMPLE FORMATTING.
      Resume: ${resumeText}`;

      promptGemini(prompt, setFeedback);
    }
  }, [resumeText]);

  useEffect(() => {
    if (feedback) {
      let dispFeedback = feedback.split("#");
      dispFeedback.forEach(function (item, index) {
        if (item === "") {
          dispFeedback.splice(index, 1);
        }
      });

      setDisplayFeedback(dispFeedback);
      const prompt = `You are Kendrick Lamar. I am going to give you a resume
      with some feedback on how to make it better. Write me a script talking as if
      you are Kendrick Lamar elaborating on each feedback point. Elaborate only a 
      couple sentences per point but make sure you cover every point. Ensure your 
      response only consists of plain text.
      Feedback: ${feedback} 
      Resume: ${resumeText}`;

      promptGemini(prompt, setScript);
    }
  }, [feedback]);

  useEffect(() => {
    if (script) {
      getAudio(script, kendrickVoiceID, setKendrickAudio, "not like us");
    }
  }, [script]);

  useEffect(() => {
    if (kendrickAudio) {
      kendrickAudio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
  }, [kendrickAudio]);

  const playAudio = () => {
    kendrickAudio.play();
    setHasPlayedOnce(true);
    setIsPlaying(true);
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
      <span className="flex items-center w-[40vw]">
        <i
          className="bg-clip-text bg-gradient-to-b from-orange-400 to-red-800 m-10 text-4xl text-transparent cursor-pointer fa-house fa-solid [-webkit-background-clip: text]"
          onClick={() => {
            if (kendrickAudio && isPlaying) {
              kendrickAudio.pause();
              setIsPlaying(false);
            }

            navigate("/");
          }}
        />
        <h1 className="bg-clip-text ml-6 font-bold text-5xl text-nowrap text-white">
          Kendrick's Critique
        </h1>
      </span>
      <div className="right-28 bottom-1 absolute ml-10 w-[42rem]">
        {pdfUrl && <Viewer fileUrl={pdfUrl} />}
      </div>
      <div className="left-10 absolute flex justify-center items-center border-4 border-gray-400 bg-gradient-to-t from-black to-gray-900 p-10 rounded-xl w-[38rem] h-[38rem]">
        {kendrickAudio ? (
          hasPlayedOnce ? (
            <ul>
              {displayFeedback.map((item, index) => (
                <li
                  className="-ml-3 p-3 pl-1 text-[19px] text-white"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <i
              onClick={playAudio}
              className="pt-[200px] w-full h-full text-8xl text-center text-white cursor-pointer fa-play fa-solid"
            ></i>
          )
        ) : (
          <div className="border-4 border-orange-500 border-t-transparent border-solid rounded-full w-12 h-12 animate-spin b"></div>
        )}
        {!isPlaying && hasPlayedOnce && (
          <i
            onClick={playAudio}
            className="fa-rotate-right right-8 bottom-8 absolute text-4xl text-white cursor-pointer fa-solid"
          ></i>
        )}
      </div>
      <img
        src="images/kdot.png"
        className="-right-5 -bottom-3 absolute w-[25rem] -scale-x-100"
      ></img>
    </div>
  );
}
