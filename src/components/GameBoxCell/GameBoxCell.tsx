import React, { ReactElement } from "react";

import "./GameBoxCell.scss";

interface GameBoxCellProps {
  children: ReactElement | ReactElement[];
  isDisabled?: boolean;
}

const GameBoxCell = ({ children, isDisabled = false }: GameBoxCellProps) => {
  return <div className="gameBoxCell">{children}</div>;
};

export default GameBoxCell;
