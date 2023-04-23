import React, { ReactElement, useCallback, useEffect, useState } from "react";
import AimoTable from "@aimo.ui/aimo-table";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { deepClone } from "src/utils/utils";
import { storeUsername, storeUserScore } from "src/reducers/userSlice";
import { ScoreBoardItemProps } from "src/services/ScoreBoardProps";
import ScoreBoardService from "src/services/ScoreBoardService";
import Button from "src/components/Button";

import "./ScoreBoardPage.scss";

const tableColumnProps = {
  name: {
    headerTitle: "Name",
  },
  date: {
    headerTitle: "Date",
    renderFunc: (row: any) => {
      return (
        <span>
          {moment.unix(Math.floor(row.date / 1000)).format("YYYY/MM/DD HH:mm")}
        </span>
      );
    },
  },
  score: {
    headerTitle: "Time",
  },
};

const ScoreBoardPage = (): ReactElement => {
  const [scoreBoard, setScoreBoard] = useState<ScoreBoardItemProps[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getScoreBoard = useCallback((): void => {
    const scoreboardService = new ScoreBoardService();
    const board = scoreboardService.get();
    setScoreBoard(board);
  }, []);

  const handleNavigateToWelcome = (): void => {
    dispatch(storeUsername(""));
    dispatch(storeUserScore(0));
    navigate("/");
  };

  const handleNavigateToPlay = (): void => {
    dispatch(storeUserScore(0));
    navigate("/play");
  };

  useEffect(() => {
    getScoreBoard();
  }, [getScoreBoard]);

  return (
    <div className="scoreBoardPageContainer">
      <div className="scoreBoardTableContainer">
        <AimoTable
          autoAddRowNumbers={true}
          cellClassName="tableCell"
          className="scoreBoardTable"
          columnProps={tableColumnProps}
          data={scoreBoard.reverse()}
          headerClassName="tableHeader"
        />
      </div>
      <div className="scoreBoardNavigationContainer">
        <Button
          className="scoreBoardToWelcomeButton"
          onClick={handleNavigateToWelcome}
        >
          Exit
        </Button>
        <Button
          className="scoreBoardToPlayButton"
          onClick={handleNavigateToPlay}
        >
          Play!
        </Button>
      </div>
    </div>
  );
};

export default ScoreBoardPage;
