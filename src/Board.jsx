import React from 'react';

const COORDINATE_MAP = Object.freeze({
  0: [0,0],
  1: [1,0],
  2: [2,0],
  3: [0,1],
  4: [1,1],
  5: [2,1],
  6: [0,2],
  7: [1,2],
  8: [2,2],
});

const ROWS = 3;
const COLS = 3;

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
        key={i}
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick({ i, coordinates: COORDINATE_MAP[i] })}
        }
      />
    );
  }

  createBoard() {
    const rows = [];
    let count = 0;

    for (let i = 0; i < ROWS; i++) {
      const cols = [];
      for (let j = 0; j < COLS; j++) {
        cols.push(this.renderSquare(count));
        count++;
      }
      rows.push(<div key={i} className="board-row">{cols}</div>)
    }
    return rows;
  }

  render() {
    return (
      <div>{this.createBoard()}</div>
    );
  }
}

export default Board;
