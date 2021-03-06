import React from 'react';
import _get from 'lodash/get';

import Board from './Board.jsx';
import calculateWinner from './calculateWinner';
import Holidays from './Holidays.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0, // represents the current step in the history
      xIsNext: true,
      moveCoordinates: [],
      ascendingMoves: true,
    };
  }

  handleClick({ i, coordinates }) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (_get(calculateWinner(squares), 'winner', false) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      moveCoordinates: this.state.moveCoordinates.concat([coordinates]),
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleSortToggle() {
    this.setState({ ascendingMoves: !this.state.ascendingMoves });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, winningLine } = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let desc = move ?
        'Go to move #' + move + ' ' + this.state.moveCoordinates[move - 1]:
        'Go to game start';
      if(move === this.state.stepNumber) desc = '<b>' + desc + '</b>';

      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            dangerouslySetInnerHTML={{__html: desc}}
          >
          </button>
        </li>
      );
    });
    if(!this.state.ascendingMoves) moves.reverse();

    let status;

    if(winner) {
      status = 'Winner: ' + winner;
    } else if(this.state.stepNumber === 9) {
      status = 'The game is a draw!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningLine={winningLine}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handleSortToggle()}>
            Sort Moves
          </button>
          <ul>{moves}</ul>
        </div>
        <Holidays />
      </div>
    );
  }
}

export default Game;
