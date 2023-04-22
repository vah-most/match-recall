import React, { ReactElement } from "react";

import "./GameBoxCell.scss";

interface GameBoxCellProps {
  img: any;
  isDisabled?: boolean;
  isMatched?: boolean;
  isRevealed?: boolean;
}

const GameBoxCell = ({
  img,
  isDisabled = false,
  isMatched = false,
  isRevealed = true,
}: GameBoxCellProps): ReactElement => {
  return (
    <div
      className={`gameBoxCell ${isRevealed ? "gameBoxCellRevealed" : ""} ${
        isMatched ? "gameBoxCellMatched" : ""
      }`}
    >
      <img alt="F" src={img} />
    </div>
  );
};

export default GameBoxCell;
