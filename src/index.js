import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squaries : Array(9).fill(null),
      isNext: true,
    }
  }

  handleClick(i){
    let squaries = this.state.squaries.slice()
    if(!squaries[i] && !this.state.winner){
      squaries[i] = this.state.isNext ? 'X':'O'
      this.setState({squaries: squaries, isNext: !this.state.isNext})
    }
    let winner = calculateWinner(squaries)
    if(winner){
      this.setState({winner: winner})
    }else if(squaries.indexOf(null) < 0){
      this.setState({tie: true})
    }
  }

  renderSquare(i ) {
    return (<Square
              position = {i} 
              value = {this.state.squaries[i]}
              onClick = {()=>this.handleClick(i)}
            />);
  }

  render() {
    let statusText = 'Next player: ' + (this.state.isNext ? 'X':'O');
    if(this.state.tie){
      statusText = 'Oops, this is a Tie. Pleas start over.'
    }
    if(this.state.winner){
      statusText = 'And the winner is: ' + this.state.winner
    }
    return (
      <div>
        <div className="status">{statusText}</div>
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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squaries){
  const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
  ]
  let winner = null
  lines.forEach(line => {
    const [a, b, c] = line
    // console.log('aa====', JSON.stringify(a));
    if(squaries[a] && squaries[a]===squaries[b] && squaries[a]===squaries[c]){
      winner = squaries[a]
    } 
  });
  return winner
}