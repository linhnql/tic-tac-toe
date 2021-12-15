import React from "react";
import "./App.css";
import Board from "./components/Board";
// import { calculateWinner } from "./index";

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
                win_squares: lines[i]
            }
        }
    }
    return null;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            },],
            sortASC: true,
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{
                squares: squares,
            },]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        })
    }

    currentMove(step, move) {
        const previous = this.state.history[move - 1];
        const currentSquares = step.squares;
        for (var i = 0; i < previous.squares.length; i++) {
            if (previous.squares[i] !== currentSquares[i]) {
                break;
            }
        }

        return `Step ${move} - ${currentSquares[i]}: (${parseInt(i / 3 + 1)}, ${i % 3 + 1})`;
    }

    toggleSort(){
        this.setState({
            sortASC: !this.state.sortASC
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const sortASC = this.state.sortASC;

        let historyArr = this.state.sortASC ? history.slice(0).reverse() : history.slice(0);


        const moves = history.map((step, move) => {
            if(!this.state.sortASC){
                move = history.length - 1 - move; 
              }
            const desc = move ? this.currentMove(step, move) : "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} className={move === this.state.stepNumber ? "current_step" : null}>{desc}</button>
                </li>
            )
        });

        let status;
        if (winner) {
            status = "Winner: " + (winner.winner);
        } else {
            status = this.state.stepNumber !== 9 ? "Next player: " + (this.state.xIsNext ? "X" : "O") : "Finished, no-winner"
        }

        return (
            <div className="game" >
                <div className="game-board" >
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winner={winner && winner.win_squares}
                    />
                    <button onClick={this.toggleSort}>Toggle Sort Order</button>
                </div>
                <div className="game-info" >
                    <div className=""> {status} </div>
                    <ul > {moves} </ul>
                </div>
            </div>
        );
    }
}

export default App;