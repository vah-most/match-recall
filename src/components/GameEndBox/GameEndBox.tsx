import React from "react";

import Button from "src/components/Button";

import "./GameEndBox.scss";

interface GameEndBoxProps {
  onScoreBoardRequest?: () => void;
  score: number;
  scoreLabel: string;
  title: string;
}
const GameEndBox = ({
  onScoreBoardRequest,
  score,
  scoreLabel,
  title,
}: GameEndBoxProps) => {
  return (
    <div className="gameEndContainer">
      <div className="gameEndTile">{title}</div>
      <div className="gameEndScore">
        {scoreLabel}: {score}
      </div>
      {onScoreBoardRequest && (
        <Button className="gameEndButton" onClick={onScoreBoardRequest}>
          See ScoreBoard
        </Button>
      )}
    </div>
  );
};

export default GameEndBox;
