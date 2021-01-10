import React from 'react';

const COORDINATE_MAP = Object.freeze({
  0: [0,0],
  1: [0,1],
  2: [0,2],
  3: [0,1],
  4: [1,1],
  5: [2,1],
  6: [0,2],
  7: [1,2],
  8: [2,2],
});

// this is an example of a controlled function component - one that only
// contains the return of a render method and has no state of its own
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick({ i, coordinates: COORDINATE_MAP[i] })}
        }
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
