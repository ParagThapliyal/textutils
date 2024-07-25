import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForms from "./components/TextForms";

function App() {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };
  return (
    <>
      <Navbar
        title="textUtils"
        about="aboutText"
        mode={mode}
        toggleMode={toggleMode}
      />
      <div className="container">
        <TextForms mode={mode} />
      </div>
    </>
  );
}

export default App;
