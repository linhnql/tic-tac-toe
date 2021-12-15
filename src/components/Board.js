import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }


  render() {
    let boardSquares = [];
    for (let i = 0; i < 3; ++i){
      let boardRow = []
      for (let j = 0; j < 3; ++j){
        boardRow.push(<div key={i*3 + j}>{this.renderSquare(i*3 + j)}</div>)
      }
      boardSquares.push(<div className="board-row" key={i}>{boardRow}</div>)
    }

    return (
      <div>
        {boardSquares}
      </div>
    );
  }
}

export default Board;
