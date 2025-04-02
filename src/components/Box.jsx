import React from "react";

const Box = ({ title, isLeft, result, item, forceIcon }) => {
  const icon = forceIcon || item?.icon || (isLeft ? "🤖" : "🙋‍♂️");
  const isHandIcon = ["✊", "✌️", "✋"].includes(icon);

  return (
    <div className={`BoxItem ${result}`}>
      <div className="Top">
        <h1>{title}</h1>
      </div>
      <div className="Middle">
        <span
          className={`IconItem ${
            isHandIcon ? (isLeft ? "Left" : "Right") : ""
          }`}
        >
          {icon}
        </span>
      </div>
      <div className="Bottom">
        <h2>{result}</h2>
      </div>
    </div>
  );
};

export default Box;
