import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pdfToText from "react-pdftotext";

export default function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const onFileSubmit = () => {
    if (file) {
      try {
        pdfToText(file)
          .then((text) => {
            navigate("/roast", { state: { resumeText: text } });
          })

          .catch((error) => console.error("Failed to extract text from pdf"));
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
      }
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="relative flex flex-col justify-center items-center bg-gradient-to-b from-zinc-800 to-zinc-900 w-screen h-screen overflow-hidden">
      <div className="absolute border-x-[400px] border-x-transparent border-yellow-100 border-b-[3000px] -rotate-[60deg]"></div>
      <div className="top-[250px] left-[400px] z-10 absolute border-2 border-red-500">
        <h1 className="text-7xl">Resume Roaster</h1>
        <div className="flex justify-between border-2 border-red-700">
          <input type="file" onChange={onFileChange} className="bg-red-500"/>
          <button onClick={onFileSubmit} className="bg-white w-20 h-10">
            Roast Me
          </button>
        </div>
      </div>
    </div>
  );
}
