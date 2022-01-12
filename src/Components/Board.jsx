import React, { Component } from "react";
import Cell from "./Cell";




export default class Board extends Component{
  constructor(props)
  {
    super(props);
    this.state = {};
  }

  renderSquares()
  {
    const cells = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const index = `${i},${j}`;
        
        cells.push(
          <Cell
            style={
              this.props.startGrid[i][j] === 0 ? { color: "red" } : { color: "black" }
            }
            key={index}
            id={index}
            onChange={this.props.onChange}
            value={this.props.grid[i][j] === 0 ? "" : this.props.grid[i][j]}
            disabled={this.props.disabled}
          />
        );
      }
    }

    return cells;
  }

  render()
  {
    return  (
      <div
      className="sudoku-grid shadow"
      >
        {this.renderSquares()}
      </div>
    )
  }

}