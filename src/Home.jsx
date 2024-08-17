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
            navigate("/roast", { state: { resumeAsText: text } });
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
    <div className="flex flex-col justify-center items-center bg-gradient-to-b from-zinc-700 to-zinc-900 w-screen h-screen">
      <h1 className="text-4xl">Resume Roaster</h1>
      <input type="file" onChange={onFileChange} className="my-20" />
      <button onClick={onFileSubmit} className="bg-white w-20 h-10">
        Roast Me
      </button>
    </div>
  );
}
