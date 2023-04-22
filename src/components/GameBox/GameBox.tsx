import React, { useCallback, useEffect, useState } from "react";

import Config from "src/config.json";

import "./GameBox.scss";
import GameBoxCell from "../GameBoxCell";
import BoardService from "src/services/BoardSerive";

interface GameBoxProps {
  onGameEnd: (withSuccess: boolean) => void;
}

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

const GameBox = ({ onGameEnd }: GameBoxProps) => {
  const [boardSpecs, setBoardSpecs] = useState<BoardSpecs>(initialBoardSpecs);
  const [gameBoard, setGameBoard] = useState<BoardProps[]>([]);
  const [matchedItems, setMatchedItems] = useState<number[]>([]);
  const [revealedItems, setRevealedItems] = useState<number[]>([]);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

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

  const handleCellClick = (cellIndex: number) => {
    if (isWaiting) return;
    if (revealedItems.findIndex((index) => index === cellIndex) >= 0) return;
    if (revealedItems.length < boardSpecs.matchCount) {
      let revealed = [...revealedItems];
      revealed.push(cellIndex);
      setRevealedItems(revealed);

      if (revealed.length >= boardSpecs.matchCount) {
        const isMatched =
          revealed.findIndex(
            (index) => gameBoard[index].type !== gameBoard[revealed[0]].type
          ) >= 0
            ? false
            : true;
        if (isMatched) {
          const matched = [...matchedItems, ...revealed];
          setMatchedItems(matched);
          setRevealedItems([]);
          if (matched.length === boardSpecs.itemCount * boardSpecs.matchCount) {
            //Game Ended!
            onGameEnd(true);
          }
        } else {
          setIsWaiting(true);
          setTimeout(() => {
            setRevealedItems((revealedItems) => []);
            setIsWaiting((isWaiting) => false);
          }, 500);
        }
      }
    }
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="gameBoxContainer">
      {gameBoard &&
        gameBoard.length > 0 &&
        [...Array(boardSpecs.rows)].map((v, rIndex) => {
          return (
            <div key={rIndex} className="gameBoxRow">
              {[...Array(boardSpecs.cols)].map((v, cIndex) => {
                const cellIndex = rIndex * boardSpecs.cols + cIndex;
                return (
                  <div
                    key={`${rIndex}-${cIndex}`}
                    className="gameBoxCellContainer"
                    onClick={() => handleCellClick(cellIndex)}
                  >
                    <GameBoxCell
                      isDisabled={false}
                      img={gameBoard[cellIndex].image}
                      isMatched={
                        matchedItems.findIndex(
                          (index) => cellIndex === index
                        ) >= 0
                          ? true
                          : false
                      }
                      isRevealed={
                        revealedItems.findIndex(
                          (index) => cellIndex === index
                        ) >= 0
                          ? true
                          : false
                      }
                    />
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
