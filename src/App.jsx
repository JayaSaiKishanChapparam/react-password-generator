import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import StrengthChecker from "./components/StrengthChecker";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

function App() {
  const [length, setLength] = useState(6);
  const [copied, setCopied] = useState(false);

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase letters", id: 1, state: false },
    { title: "Include Lowercase letters", id: 2, state: false },
    { title: "Include Numbers", id: 3, state: false },
    { title: "Include Symbols", id: 4, state: false },
  ]);

  const handleCheckboxChange = (id) => {
    const updatedCheckboxData = checkboxData.map((data) => {
      if (data.id === id) {
        data.state = !data.state;
      }
      return data;
    });
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* password text & copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <Button
            onClick={handleCopy}
            text={copied ? "Copied!" : "Copy"}
            customClass={"copyBtn"}
          />
        </div>
      )}
      {/* Character Length Slider */}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min={4}
          max={20}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/* Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map(({ title, id, state }) => {
          return (
            <Checkbox
              key={id}
              state={state}
              title={title}
              onChange={() => handleCheckboxChange(id)}
            />
          );
        })}
      </div>
      {/* Strength */}
      <StrengthChecker password={password} />
      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {/* Generate Button */}
      <Button
        customClass={"generateBtn"}
        text={"Generate Password"}
        onClick={() => generatePassword(checkboxData, length)}
      />
    </div>
  );
}

export default App;
