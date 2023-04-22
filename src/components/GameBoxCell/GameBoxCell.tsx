import React, { ReactElement, useEffect, useRef, useState } from "react";

import "./GameBoxCell.scss";

interface GameBoxCellProps {
  img: any;
  isDisabled?: boolean;
  isMatched?: boolean;
  isRevealed?: boolean;
  label?: string;
}

interface DisplayRefProps {
  isMatched: boolean;
  isRevealed: boolean;
}

const GameBoxCell = ({
  img,
  isDisabled = false,
  isMatched = false,
  isRevealed = true,
  label = "",
}: GameBoxCellProps): ReactElement => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const revealRef = useRef<DisplayRefProps>();

  useEffect(() => {
    const prevState = revealRef.current;

    if (!isDisabled && prevState && (!isMatched || !prevState.isMatched)) {
      if (!prevState.isRevealed && isRevealed) setIsVisible(true);
      else if (prevState.isRevealed && !isRevealed) setIsVisible(false);
      if (!prevState.isMatched && isMatched) setIsVisible(true);
    }

    revealRef.current = {
      isRevealed: isRevealed,
      isMatched: isMatched,
    };
  }, [isRevealed, isMatched]);

  return (
    <div
      className={`gameBoxCell ${isVisible ? "gameBoxCellVisible" : ""} ${
        isMatched ? "gameBoxCellMatched" : ""
      }`}
    >
      <div className="gameBoxCellCover">&nbsp;</div>
      <div className="gameBoxCellImage">
        <img alt={label} src={img} />
      </div>
    </div>
  );
};

export default GameBoxCell;
