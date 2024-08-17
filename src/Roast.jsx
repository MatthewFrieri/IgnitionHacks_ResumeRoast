import { useLocation } from "react-router-dom";

export default function Roast() {
  const location = useLocation();
  const receivedState = location.state;

  return (
    <div>
      <h1>roast page</h1>
      <p>{receivedState.resumeAsText}</p>
    </div>
  );
}
