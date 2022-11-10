import { useState } from "react";
import Toggle from "./components/toggle";

function App() {
  const [showContent, setShowContent] = useState(false);
  const handleToggleContent = () => {
    setShowContent((showContent) => !showContent);
  };
  return (
    <div className="App">
      <Toggle checked={showContent} onClick={handleToggleContent}></Toggle>
    </div>
  );
}

export default App;
