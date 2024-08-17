import { useLocation } from "react-router-dom";

export default function Roast() {
  const location = useLocation();
  const resumeText = location.state.resumeAsText;

  return (
    <div>
      <h1>roast page</h1>
      <p>{resumeText}</p>
    </div>
  );
}
