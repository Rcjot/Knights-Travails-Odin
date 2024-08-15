const chessBoard = (function () {
  const Board = Array(8)
    .fill(null)
    .map(() =>
      Array(8)
        .fill(null)
        .map(() => [])
    );

  function populateBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        pushPossibleEnds(i, j);
        console.log(`[${i}][${j}]: ${Board[i][j]}`);
      }
    }
  }

  function pushPossibleEnds(i, j) {
    const incrementedEnds = [i + 1, i - 1, j + 1, j - 1]; // wrong algorithm....
    const possibleEnds = incrementedEnds.filter((num) => num > 0);
    const filteredEnds = possibleEnds.filter(
      (value, index) => possibleEnds.indexOf(value) === index
    );
    console.log(filteredEnds);
    for (let iHere of filteredEnds) {
      for (let jHere of possibleEnds) {
        const arr = [iHere, jHere];

        Board[i][j].push(arr);
      }
    }

    const iaddOne = i + 1;
    const iminOne = i - 1;
    const jaddOne = j + 1;
    const jminOne = j - 1;
  }

  return {
    populateBoard,
  };
})();

// function knightMoves(start, end) {}
chessBoard.populateBoard();
