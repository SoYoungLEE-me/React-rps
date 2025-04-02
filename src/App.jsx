import "./App.css";
import Box from "./components/Box";
import ButtonGroup from "./components/ButtonGroup";
import { useState, useRef } from "react";

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

  //스타트 버튼 추가
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [computerIcon, setComputerIcon] = useState("🤖");
  const intervalRef = useRef(null);
  const cancelledRef = useRef(false);

  //스코어
  const [score, setScore] = useState({
    WIN: 0,
    LOSE: 0,
    TIE: 0,
  });

  const play = (userChoice) => {
    stopAnimation();

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
      if (cancelledRef.current) return;

      setComputerSelect(null);
      setIsPlaying(true);
      startComputerAnimation();
    }, 1000);

    setScore((prev) => {
      return {
        ...prev,
        [userResult]: prev[userResult] + 1,
      };
    });
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
    cancelledRef.current = false;

    setIsStarted(true);
    setIsPlaying(true);
    startComputerAnimation();
  };

  const startComputerAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; //중복 방지
    }

    const icons = ["✊", "✋", "✌️"];
    let index = 0;

    intervalRef.current = setInterval(() => {
      setComputerIcon(icons[index % 3]);
      index++;
    }, 120);
  };

  const stopAnimation = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  //reset버튼
  const resetGame = () => {
    stopAnimation(); // 애니메이션 멈추기
    intervalRef.current = null;
    cancelledRef.current = true; //취소 상태 기억

    setUserSelect(null);
    setComputerSelect(null);
    setUserResult("");
    setComputerResult("");

    setComputerIcon("🤖"); // 다시 🤖 아이콘으로
    setIsPlaying(false);
    setIsStarted(false); // START 버튼이 다시 보이게

    setScore({ WIN: 0, LOSE: 0, TIE: 0 });
  };

  return (
    <div className="App">
      {!isStarted ? (
        <h1 className="Title">Rock! Scissors! Paper!</h1>
      ) : (
        <h2>
          {score.LOSE} : {score.WIN}
        </h2>
      )}

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
        <ButtonGroup onPlay={play} onReset={resetGame} />
      )}
    </div>
  );
}

export default App;
