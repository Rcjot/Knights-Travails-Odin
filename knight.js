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
    // const incrementedEnds = [i + 1, i - 1, j + 1, j - 1]; // wrong algorithm....
    // const possibleEnds = incrementedEnds.filter((num) => num > 0);
    // const filteredEnds = possibleEnds.filter(
    //   (value, index) => possibleEnds.indexOf(value) === index
    // );
    const coordinates = [i, j];
    const increment = [1, 2];
    const incrementFunc = [
      (num, addend) => num + addend,
      (num, subtrahend) => num - subtrahend,
    ];
    const iArrEnds = Array(2)
      .fill(null)
      .map(() => []);
    const jArrEnds = Array(2)
      .fill(null)
      .map(() => []);
    const possibleEnds = [];
    // console.log(incrementFunc[0](1, 2));
    for (let coord = 0; coord < 2; coord++) {
      for (let func of incrementFunc) {
        const num = func(i, increment[coord]);
        if (num > 0) iArrEnds[coord].push(num);
      }
    }
    for (let coord = 0; coord < 2; coord++) {
      for (let func of incrementFunc) {
        const num = func(j, increment[coord]);
        if (num > 0) jArrEnds[coord].push(num);
      }
    }

    console.log(iArrEnds);
    console.log(jArrEnds);

    // const arr = [iHere, jHere];

    // Board[i][j].push(arr);
    // for (let iHere of filteredEnds) {
    //   for (let jHere of possibleEnds) {
    //   }

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
