import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const file = location.state?.pdf;
  const navigate = useNavigate();

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
