const chessBoard = (function () {
  // const possibleEnds = [];

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
        Board[i][j] = Board[i][j].concat(pushPossibleEnds(i, j));
        console.log(`[${i}][${j}]`);
        console.log(Board[i][j]);
      }
    }
  }

  function pushPossibleEnds(x, y) {
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
    //push possible x values, x[0] : +- 1; x[1] +- 2;
    for (let coord = 0; coord < 2; coord++) {
      for (let func of incrementFunc) {
        const num = func(x, increment[coord]);
        if (num >= 0) iArrEnds[coord].push(num);
      }
    }
    //push possible y values, y[0] : +- 1; y[1] +- 2;
    for (let coord = 0; coord < 2; coord++) {
      for (let func of incrementFunc) {
        const num = func(y, increment[coord]);
        if (num >= 0) jArrEnds[coord].push(num);
      }
    }
    // for each iArrEnds[0] pair with jArrEnds[1];
    // for each jArrEnds[0] pair with iArrEnds[1];
    // pair each 1s and 2s;
    for (let oneIncrement of iArrEnds[0]) {
      for (let twoIncrement of jArrEnds[1]) {
        const myArr = [oneIncrement, twoIncrement];
        possibleEnds.push(myArr);
      }
    }
    for (let oneIncrement of jArrEnds[0]) {
      for (let twoIncrement of iArrEnds[1]) {
        const myArr = [twoIncrement, oneIncrement];
        possibleEnds.push(myArr);
      }
    }
    // console.log(possibleEnds);

    return possibleEnds;
  }

  function knightMoves(
    start,
    end,
    queue = [],
    traversed = [],
    stepArr = [],
    step = 0
  ) {
    console.log("start");
    let x1 = start[0];
    let y1 = start[1];
    let x2 = end[0];
    let y2 = end[1];
    const startArr = [x1, y1];
    const possibleDests = Board[x1][y1];
    queue.push(startArr);
    console.log(queue);
    console.log("a");

    const dequeued = Board[queue[0][0]][queue[0][1]];

    queue.shift();

    for (let square of dequeued) {
      if (square[0] === x2 && square[1] === y2) {
      } else {
        queue.push(square);
      }
    }

    console.log(queue);
    /**
     * for each path from start, check whether it contains end,
     * else queue the path
     */
  }

  return {
    populateBoard,
    knightMoves,
  };
})();

// function knightMoves(start, end) {}
chessBoard.populateBoard();
chessBoard.knightMoves([3, 3], [5, 2]);
