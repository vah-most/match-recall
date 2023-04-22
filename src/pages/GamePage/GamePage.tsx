import React, { useEffect, useState } from "react";

import GameBox from "src/components/GameBox";

import "./GamePage.scss";
import GameEndBox from "src/components/GameEndBox";

const GamePage = () => {
  const [spentTime, setSpentTime] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const countSeconds = (): void => {
    setSpentTime((spentTime) => spentTime + 1);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      countSeconds();
    }, 1000);
    setTimer(timer);

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, []);

  const handleGameEnd = (withSuccess: boolean): void => {
    if (timer) window.clearTimeout(timer);
    setGameEnded(true);
  };

  return (
    <div className="gamePageContainer">
      <div className="gamePageHeader">
        Time:
        <span className="gameSpentTime">{spentTime}</span>
      </div>
      <div className="gamePageContent">
        <GameBox onGameEnd={handleGameEnd} />
        {gameEnded && (
          <div className="gameBoxLoadingCover">
            <GameEndBox
              score={spentTime}
              scoreLabel="Time"
              title="Well Done!"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
