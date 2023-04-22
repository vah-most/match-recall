const getBoardImages = (): any[] => {
  let boardImages: any[] = [];
  [...Array(8)].forEach((v, index) => {
    boardImages[index] = require(`src/assets/board/${index < 10 ? "0" : ""}${
      index + 1
    }.svg`);
  });

  return boardImages;
};

export default getBoardImages;
