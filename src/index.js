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
    if(!squaries[i]){
      squaries[i] = this.state.isNext ? 'X':'O'
      this.setState({squaries: squaries, isNext: !this.state.isNext})
    }
  }

  renderSquare(i ) {
    return (<Square 
              value = {this.state.squaries[i]}
              onClick = {()=>this.handleClick(i)}
            />);
  }

  render() {
    const status = 'Next player: ' + (this.state.isNext ? 'X':'O');

    return (
      <div>
        <div className="status">{status}</div>
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
