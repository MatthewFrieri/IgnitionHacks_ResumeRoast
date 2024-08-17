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
    <div className="relative flex flex-col justify-center items-center bg-gradient-to-b from-zinc-700 to-zinc-900 w-screen h-screen overflow-hidden">
      <img src="frontPageDrizzy.png" className="absolute bottom-0 z-10 -right-10 w-[60rem]"></img>
      <div className="absolute right-1 border-x-[400px] border-x-transparent border-yellow-100 border-b-[3000px] -rotate-[20deg]"></div>
      <div className="flex flex-col gap-8 top-[100px] left-[150px] z-10 absolute">
        <div>
          <h1 className="text-[150px] text-left text-gray-200 leading-[150px]">
            Resume <br /> Roast
          </h1>
          <h1 className="text-3xl text-left text-gray-200 ml-2 mt-5">
            This is a cool line or something!
          </h1>
        </div>
        <div className="flex flex-row items-center gap-8">
          <label htmlFor="fileInput" className="customFileInput">
            <span>{file ? <p>{file.name}</p> : <p>Select File</p>}</span>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={onFileChange}
            className=""
          ></input>
          <button
            onClick={onFileSubmit}
            className="text-4xl w-[300px] h-[90px] border-2 border-blue-500 rounded-[4px] text-white text-[48px]"
          >
            Roast Me
          </button>
        </div>
      </div>
    </div>
  );
}
