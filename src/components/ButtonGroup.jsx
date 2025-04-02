function ButtonGroup({ onPlay, onReset }) {
  return (
    <>
      <div className="ButtonItem">
        <button onClick={() => onPlay("rock")}>✊</button>
        <button onClick={() => onPlay("scissors")}>✌️</button>
        <button onClick={() => onPlay("paper")}>✋</button>
      </div>
      <div className="ControlButtons">
        <button onClick={onReset}>Reset</button>
      </div>
    </>
  );
}

export default ButtonGroup;
