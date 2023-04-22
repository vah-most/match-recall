import { ScoreBoardItemProps } from "./ScoreBoardProps";

class StorageService {
  set = (token: string, value: any) => {
    return localStorage.setItem(token, JSON.stringify(value));
  };

  get = (token: string): any => {
    const data = localStorage.getItem(token);
    if (!data) return null;
    return JSON.parse(data);
  };
}

export default StorageService;
