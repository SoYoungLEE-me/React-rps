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
  const [ComputerSelect, setComputerSelect] = useState(null);
  const [userResult, setUserResult] = useState("");
  const [computerResult, setComputerResult] = useState("");
  const [animationInterval, setAnimationInterval] = useState(null);

  //스타트 버튼 추가
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [computerIcon, setComputerIcon] = useState("🤖");

  const play = (userChoice) => {
    if (animationInterval) {
      clearInterval(animationInterval); // 이전 interval 제거
      setAnimationInterval(null);
    }

    const user = choice[userChoice];
    const computer = randomChoice();

    setUserSelect(user);
    setComputerSelect(computer);
    setComputerIcon(computer.icon);
    setIsPlaying(false); // 컴퓨터 애니메이션 멈춤

    const userResult = judgement(user, computer);
    setUserResult(userResult);

    const computerResult =
      userResult === "WIN" ? "LOSE" : userResult === "LOSE" ? "WIN" : "TIE";
    setComputerResult(computerResult);

    setTimeout(() => {
      setComputerSelect(null);
      setIsPlaying(true);
      startComputerAnimation();
    }, 1000);
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice); //객체의 키값만 뽑아서 array로 만들어주는 함수, 그니까 지금 안에 ["rock", "scissors", "paper"] 이렇게 들어있음
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem]; //itemArray에 랜덤하게 인덱스 값 부여, rock, scissors, paper 중 하나 랜덤하게 final에 저장
    return choice[final]; //객체값까지 전부 전달하면 끝-!
  };

  const judgement = (user, computer) => {
    if (user.name === computer.name) {
      return "TIE";
    } else if (user.name === "Rock") {
      return computer.name === "Scissors" ? "WIN" : "LOSE";
    } else if (user.name === "Paper") {
      return computer.name === "Rock" ? "WIN" : "LOSE";
    } else if (user.name === "Scissors") {
      return computer.name === "Paper" ? "WIN" : "LOSE";
    }
  };

  const startGame = () => {
    setIsStarted(true);
    setIsPlaying(true);
    startComputerAnimation();
  };

  const startComputerAnimation = () => {
    const icons = ["✊", "✋", "✌️"];
    let index = 0;

    const interval = setInterval(() => {
      setComputerIcon(icons[index % 3]);
      index++;
    }, 120);

    setAnimationInterval(interval);
  };

  return (
    <div className="App">
      <div className="Box">
        <Box
          title={"Computer"}
          isLeft={true}
          result={computerResult}
          item={ComputerSelect}
          forceIcon={isPlaying ? computerIcon : undefined}
        />
        <Box
          title={"You"}
          isLeft={false}
          result={userResult}
          item={userSelect}
        />
      </div>
      {!isStarted ? (
        <div className="StartItem">
          <button onClick={startGame}>START</button>
        </div>
      ) : (
        <div className="ButtonItem">
          <button onClick={() => play("rock")}>✊</button>
          <button onClick={() => play("scissors")}>✌️</button>
          <button onClick={() => play("paper")}>✋</button>
        </div>
      )}
    </div>
  );
}

export default App;
