import getBoardImages from "./ImageService";

class BoardService {
  getImageSrc(itemNo: number, itemCount: number) {
    if (itemNo >= itemCount) itemNo = itemNo % itemCount;
    const images = getBoardImages();
    return images[itemNo];
  }
}

export default BoardService;
