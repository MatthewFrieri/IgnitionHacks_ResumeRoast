import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pdfToText from "react-pdftotext";
import "./styles/main.css";

export default function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [pdfData, setPdfData] = useState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component mounts
    setIsVisible(true);
  }, []);

  const onFileSubmit = () => {
    if (file) {
      try {
        pdfToText(file)
          .then((text) => {
            navigate("/roast", {
              state: { resumeText: text, pdfData: pdfData },
            });
          })

          .catch((error) => console.error("Failed to extract text from pdf"));
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
      }
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Remove the metadata part
        setPdfData(base64String);
      };
      reader.readAsDataURL(file); // This will read the file as a Base64 string
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center bg-gradient-to-b from-zinc-700 to-zinc-900 w-screen h-screen overflow-hidden">
      <img
        src="frontPageDrizzy.png"
        className="absolute bottom-0 z-10 -right-10 w-[60rem]"
      ></img>
      <img
        src="drizzyHand.png"
        className="absolute bottom-0 z-30 -right-10 w-[60rem]"
      ></img>
      <div className={`image-container ${isVisible ? "slide-in" : ""}`}>
        <img src="microphone.png" className="sliding-image"></img>
      </div>

      <div
        className="absolute right-1 w-[50rem] h-[75rem] -rotate-[30deg]"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-yellow-light), rgba(0,0,0,0))",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
      />

      <div className="flex flex-col gap-8 top-[100px] left-[150px] z-40 absolute">
        <div>
          <h1 className="text-[150px] text-left text-gray-200 leading-[150px] font-bold bg-gradient-to-b from-orange-400 to-red-800 [-webkit-background-clip: text] bg-clip-text text-transparent">
            Resume <br /> Roast
          </h1>
          <h1 className="text-3xl text-left text-gray-200 ml-2 mt-5">
            Have your favourite rappers critique your resume.
          </h1>
        </div>
        <div className="flex flex-row items-center gap-8">
          <label htmlFor="fileInput" className="customFileInput">
            <span>{file ? <p>{file.name}</p> : <p>Select File</p>}</span>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="application/pdf"
            onChange={onFileChange}
            className=""
          ></input>
          <button
            onClick={onFileSubmit}
            className={`text-4xl w-[300px] h-[90px] border-2 border-gray-600 rounded-[4px] text-white font-bold flex justify-center items-center gap-4 ${
              file ? "hover:border-4" : "cursor-default"
            }`}
          >
            <p>Roast Me</p>
            <i className="fa-solid fa-fire-flame-curved bg-gradient-to-b from-orange-400 to-red-800 [-webkit-background-clip: text] bg-clip-text text-transparent"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
