import "./App.css";
import Box from "./components/Box";
import { useState } from "react";

const choice = {
  rock: {
    name: "Rock",
    icon: "✊",
  },
  scissors: {
    name: "Scissors",
    icon: "✌️",
  },
  paper: {
    name: "Paper",
    icon: "✋",
  },
};

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
  };
  return (
    <div className="App">
      <div className="Box">
        <Box title={"Computer"} isLeft={true} result={"WIN"} />
        <Box title={"You"} isLeft={false} result={"WIN"} item={userSelect} />
      </div>
      <div className="ButtonItem">
        <button onClick={() => play("rock")}>✊</button>
        <button onClick={() => play("scissors")}>✌️</button>
        <button onClick={() => play("paper")}>✋</button>
      </div>
    </div>
  );
}

export default App;
