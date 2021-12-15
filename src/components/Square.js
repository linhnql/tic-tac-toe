import React from "react";

function Square(props) {
  const winningSquareStyle = {
    backgroundColor: '#ccc'
  };

  return (
    <button
      className="square"
      onClick={props.onClick}
      style={props.win_square ? winningSquareStyle : null}
    >
      {props.value}
    </button>
  );
}

export default Square;
