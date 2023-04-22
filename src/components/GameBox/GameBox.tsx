import React, { useCallback, useEffect, useState } from "react";

import Config from "src/config.json";

import "./GameBox.scss";
import GameBoxCell from "../GameBoxCell";
import BoardService from "src/services/BoardSerive";

interface BoardSpecs {
  itemCount: number;
  rows: number;
  cols: number;
  matchCount: number;
}

const initialBoardSpecs: BoardSpecs = {
  itemCount: 8,
  rows: 4,
  cols: 4,
  matchCount: 2,
};

interface BoardProps {
  type: number;
  image: any;
}

const GameBox = () => {
  const [boardSpecs, setBoardSpecs] = useState<BoardSpecs | null>(null);
  const [gameBoard, setGameBoard] = useState<BoardProps[]>([]);
  const [revealedItems, setRevealedItems] = useState<number[]>([]);

  const initialize = useCallback((): void => {
    const itemCount = Config.ItemCount ? Config.ItemCount : 4;
    if (!itemCount) {
      setBoardSpecs(initialBoardSpecs);
      return;
    }

    const rows = Math.floor(Math.sqrt(itemCount * 2));
    const cols = (itemCount * 2) / rows;
    const specs = {
      ...initialBoardSpecs,
      itemCount,
      rows,
      cols,
    };

    let board = Array.from({ length: specs.itemCount }, () => ({
      type: -1,
      image: "",
    }));

    const boardService = new BoardService();
    [...Array(specs.itemCount)].forEach((v, iIndex) => {
      [...Array(specs.matchCount)].forEach((v, cIndex) => {
        let cellPos;
        const maxPos = specs.itemCount * specs.matchCount;
        do {
          cellPos = Math.floor(Math.random() * maxPos);
          if (!board[cellPos] || board[cellPos].type <= 0) {
            board[cellPos] = {
              type: iIndex + 1,
              image: boardService.getImageSrc(iIndex, specs.itemCount),
            };
            break;
          }
        } while (true);
      });
    });

    setGameBoard(board);
    setBoardSpecs(specs);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="gameBoxContainer">
      {gameBoard &&
        boardSpecs &&
        [...Array(boardSpecs.rows)].map((v, rIndex) => {
          return (
            <div key={rIndex} className="gameBoxRow">
              {[...Array(boardSpecs.cols)].map((v, cIndex) => {
                return (
                  <div
                    key={`${rIndex}-${cIndex}`}
                    className="gameBoxCellContainer"
                  >
                    <GameBoxCell isDisabled={false}>
                      <img
                        alt="F"
                        src={gameBoard[rIndex * boardSpecs.cols + cIndex].image}
                      />
                    </GameBoxCell>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default GameBox;
