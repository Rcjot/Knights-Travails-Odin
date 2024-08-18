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
        // console.log(`[${i}][${j}]`);
        // console.log(Board[i][j]);
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
        if (num >= 0 && num <= 7) iArrEnds[coord].push(num);
      }
    }
    //push possible y values, y[0] : +- 1; y[1] +- 2;
    for (let coord = 0; coord < 2; coord++) {
      for (let func of incrementFunc) {
        const num = func(y, increment[coord]);
        if (num >= 0 && num <= 7) jArrEnds[coord].push(num);
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

  class queueItem {
    constructor(start, traversed, step) {
      this.start = start;
      this.x1 = start[0];
      this.y1 = start[1];

      this.traversed = traversed;
      this.step = step;
    }

    addStep() {
      return this.step + 1;
    }

    addTraverse(square) {
      let tempTraversed = this.traversed.slice();
      tempTraversed.push(square);
      return tempTraversed;
    }
  }

  function knightMoves(start, end, queue = [], traversed = [], pathArr = []) {
    // console.log("start");

    let x2 = end[0];
    let y2 = end[1];
    const startSquare = start;
    let myQueueItem;
    if (traversed.length === 0) {
      myQueueItem = new queueItem(start, [start], 0);
      queue.push(myQueueItem);
      traversed.push(startSquare);
    }

    // console.log(queue[0]);
    // console.log(traversed);

    const dequeued = Board[queue[0].x1][queue[0].y1];
    const dequeuedItem = queue[0];
    queue.shift();

    for (let square of dequeued) {
      // console.log(square);
      // to avoid pushing already enqueued items
      if (traversed.includes(square)) {
      } else if (
        (square[0] === x2 && square[1] === y2) ||
        dequeuedItem.step === 5
      ) {
        const updatedTraverse = dequeuedItem.addTraverse(square);
        updatedTraverse.push(dequeuedItem.addStep());
        pathArr.push(updatedTraverse);
      } else {
        traversed.push(square);
        const updatedTraverse = dequeuedItem.addTraverse(square);
        const step = dequeuedItem.addStep();
        const childQueueItem = new queueItem(square, updatedTraverse, step);
        queue.push(childQueueItem);
      }
    }
    // console.log(queue.length);
    if (queue.length === 0) {
      let bestPath;
      let step = 10;
      for (let path of pathArr) {
        let pathStep = path[path.length - 1];
        if (pathStep < step) {
          step = pathStep;
          bestPath = path;
        }
      }
      console.log(bestPath);
      console.log(step);
      return;
    } else {
      knightMoves(queue[0].start, end, queue, traversed, pathArr);
    }

    /**
     * for each path from start, check whether it contains end,
     * else enqueue the path
     */
  }

  return {
    populateBoard,
    knightMoves,
  };
})();

// function knightMoves(start, end) {}
chessBoard.populateBoard();
chessBoard.knightMoves([3, 3], [4, 3]);
chessBoard.knightMoves([0, 0], [3, 3]);
chessBoard.knightMoves([3, 3], [0, 0]);
chessBoard.knightMoves([0, 0], [7, 7]);
