import React, { useState, useRef } from "react";
import "./TextForms.css";

export default function TextForms(props) {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [oldWord, setOldWord] = useState("");
  const [newWord, setNewWord] = useState("");
  const [isUpperCase, setIsUpperCase] = useState(true);
  const historyStack = useRef([]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    updateCounts(newText);
    saveToHistory(newText);
    setText(newText);
  };

  const updateCounts = (text) => {
    let words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    let wordCount = words.length; 
    let characterCount = text.replace(/\s/g, "").length;

    setWordCount(wordCount);
    setCharacterCount(characterCount);
  };

  const saveToHistory = (newText) => {
    historyStack.current.push(newText);
  };

  const clearText = () => {
    saveToHistory(text);
    setText("");
    setWordCount(0);
    setCharacterCount(0);
  };

  const undoLastAction = () => {
    if (historyStack.current.length > 0) {
      const lastText = historyStack.current.pop();
      setText(lastText);
      updateCounts(lastText);
    }
  };

  const toggleCaseText = () => {
    saveToHistory(text);
    let newText;
    if (isUpperCase) {
      newText = text.toUpperCase();
    } else {
      newText = text.toLowerCase();
    }
    setText(newText);
    updateCounts(newText);
    setIsUpperCase(!isUpperCase);
  };

  const reverseText = () => {
    saveToHistory(text);
    let newText = text.split("").reverse().join("");
    setText(newText);
    updateCounts(newText);
  };

  const capitalizeFirstLetter = () => {
    saveToHistory(text);
    let newText = text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(newText);
    updateCounts(newText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const removeExtraSpaces = () => {
    saveToHistory(text);
    let newText = text.replace(/\s+/g, " ").trim();
    setText(newText);
    updateCounts(newText);
  };

  const replaceWord = () => {
    saveToHistory(text);
    let newText = text.replace(new RegExp(oldWord, "g"), newWord);
    setText(newText);
    updateCounts(newText);
  };

  return (
    <div
      className="container"
      style={{ color: props.mode === "dark" ? "#ccc" : "black" }}
    >
      <h1 className="my-3">Write Text To Convert</h1>
      <div className="mb-3">
        <textarea
          onChange={handleTextChange}
          value={text}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="9"
          style={{
            backgroundColor: props.mode === "dark" ? "#333" : "white",
            color: props.mode === "dark" ? "#ccc" : "black",
          }}
        ></textarea>
      </div>
      <div className="button-container">
        <button className="btn btn-success mx-2" onClick={toggleCaseText}>
          {isUpperCase ? "Convert To Uppercase" : "Convert To Lowercase"}
        </button>
        <button
          className="btn btn-success mx-2"
          onClick={capitalizeFirstLetter}
        >
          Capitalize First Letter
        </button>
        <button className="btn btn-success" onClick={removeExtraSpaces}>
          Remove Extra Spaces
        </button>
        <button className="btn btn-success mx-2" onClick={reverseText}>
          Reverse Text
        </button>
        <button className="btn btn-success" onClick={copyToClipboard}>
          Copy Text
        </button>
        <button className="btn btn-success mx-2" onClick={clearText}>
          Clear Text
        </button>
        <button className="btn btn-success mx-2" onClick={undoLastAction}> 
          Undo
        </button>
      </div>
      <div className="flex-container">
        <div className="replace-container">
          <h2>Replace Word</h2>
          <input
            type="text"
            value={oldWord}
            onChange={(e) => setOldWord(e.target.value)}
            placeholder="Old Word"
            className="form-control mb-2"
            style={{
              backgroundColor: props.mode === "dark" ? "#333" : "white",
              color: props.mode === "dark" ? "#ccc" : "black",
            }}
          />
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="New Word"
            className="form-control mb-2"
            style={{
              backgroundColor: props.mode === "dark" ? "#333" : "white",
              color: props.mode === "dark" ? "#ccc" : "black",
            }}
          />
          <button className="btn btn-success" onClick={replaceWord}>
            Replace Word
          </button>
        </div>
        <div className="summary-container mx-5">
          <h2>Your Text Summary</h2>
          <p>
            {wordCount} words and {characterCount} characters
          </p>
        </div>
      </div>
    </div>
  );
}
