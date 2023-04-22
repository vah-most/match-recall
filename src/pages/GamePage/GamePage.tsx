import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import GameBox from "src/components/GameBox";
import GameEndBox from "src/components/GameEndBox";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import ScoreBoardService from "src/services/ScoreBoardService";
import { ScoreBoardItemProps } from "src/services/ScoreBoardProps";

import "./GamePage.scss";

const GamePage = () => {
  const [spentTime, setSpentTime] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

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
    const scoreBoardService = new ScoreBoardService();
    const newScore: ScoreBoardItemProps = {
      name: user.name,
      score: spentTime,
      date: Number(new Date()),
    };
    scoreBoardService.addIfHighScore(newScore);
  };

  const handleScoreBoardRequest = (): void => {
    navigate("/scoreboard");
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
              onScoreBoardRequest={handleScoreBoardRequest}
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
