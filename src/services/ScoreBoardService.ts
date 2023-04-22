import { ScoreBoardItemProps } from "./ScoreBoardProps";
import StorageService from "./StorageService";

import Config from "src/config.json";

class ScoreBoardService {
  token = "scores";
  storage: StorageService;

  constructor() {
    this.storage = new StorageService();
  }

  sortHighScores = (scoreBoard: ScoreBoardItemProps[]) => {
    const data = scoreBoard.sort(
      (a: ScoreBoardItemProps, b: ScoreBoardItemProps) => {
        if (Config.HighScoreIsReverse) {
          return a.score > b.score ? 1 : -1;
        }
        return a.score > b.score ? -1 : 1;
      }
    );

    return data;
  };

  addIfHighScore = (item: ScoreBoardItemProps) => {
    const scoreBoard = this.storage.get(this.token);
    let newScoreBoard = scoreBoard ? [...scoreBoard] : [];
    newScoreBoard.push(item);
    let highScores = this.sortHighScores(newScoreBoard);
    while (highScores.length > Config.HighScoreCount) highScores.pop();
    this.storage.set(this.token, highScores);
  };

  get = (): any => {
    const board = this.storage.get(this.token);
    if (!board) return [];

    return board ? board : [];
  };
}

export default ScoreBoardService;
