import React from "react";
import "./App.css";
import Board from "./components/Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  return {
    winner: null,
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      sortASC: true,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastMoveSquare: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  toggleSort() {
    this.setState({
      sortASC: !this.state.sortASC,
    });
  }

  render() {
    const history = this.state.history;
    const currentStep = this.state.stepNumber;
    const current = history[currentStep];
    const winInfor = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const lastMoveSquare = step.lastMoveSquare;
      const row = parseInt(lastMoveSquare / 3) + 1;
      const column = (lastMoveSquare % 3) + 1;
      const desc = move
        ? `Go to #${move}: (${row}, ${column})`
        : "Go to game start";
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={move === currentStep ? "current_step" : null}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    const winner = winInfor.winner;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status =
        currentStep !== 9
          ? "Next player: " + (this.state.xIsNext ? "X" : "O")
          : "Draw! End game";
    }

    const sortASC = this.state.sortASC;
    if (!sortASC) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="game-main">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winLine={winInfor.line}
              currentSquare={current.lastMoveSquare}
            />
          </div>
          <button onClick={() => this.toggleSort()}>Toggle Sort Order</button>
        </div>
        <div className="game-info">
          <div className="game-info status"> {status} </div>
          <ul> {moves} </ul>
        </div>
      </div>
    );
  }
}

export default App;
