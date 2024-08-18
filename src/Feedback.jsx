import { useLocation, useNavigate } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useState } from "react";

export default function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  // const [pdfUrl, setPdfUrl] = useState();
  const pdfData = location.state?.pdfData;
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
    // setPdfUrl(URL.createObjectURL(pdfBlob));
    pdfUrl = URL.createObjectURL(pdfBlob);
  }

  return (
    <div className="relative bg-gradient-to-b from-zinc-700 to-zinc-900 w-screen h-screen overflow-hidden">
      <i
          className="m-10 text-5xl text-white cursor-pointer fa-house fa-solid"
          onClick={() => {
            navigate("/");
          }}
        />
      <p
        onClick={() => {
          navigate("/roast", {state : {pdf : file}});
        }}
        className="bottom-10 left-10 absolute text-3xl text-white cursor-pointer"
      >
        ← Back to Drake
      </p>
      <img src="kdot.png" className="right-10 -bottom-3 absolute w-[30rem]"></img>
    </div>
    
  )
}
