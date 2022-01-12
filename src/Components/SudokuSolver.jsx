import React, { Component, useEffect, useState } from "react";
import { Row, Col, Button, FormCheck, Card } from "react-bootstrap";
import Board from "./Board";
import sudokuService, { EMPTY_GRID, EMPTY_START_GRID } from "../Services/sudokuService";
import storageService from "../Services/storageService";

export default class SudokuSolver extends Component {


  constructor(props)
  {
    super(props);
    this.state= {
      startGrid: EMPTY_START_GRID(),
      isGridDisabled: false,
      grid: EMPTY_GRID(),
      isShowProcessChecked: true,
      isSolved: false,
      isSolving: false,
      progressSpeed: 10
  };
  this.handleSolveButtonClicked=this.handleSolveButtonClicked.bind(this);
  this.handleValueChange=this.handleValueChange.bind(this);
  this.reset = this.reset.bind(this);
  this.undo = this.undo.bind(this);


  
  
  ;}

  componentDidMount()
  {
    const storageBoard = storageService.getBoard();
    if (storageBoard) this.setState({grid: storageBoard});
  }




    handleValueChange(e, id) {
    const { value } = e.target;
    if ((value <= 9 && value > 0) || value === "") {
      const position = id.split(",");
      const newGrid = this.state.grid.map((arr) => arr.slice());
      if (value === "") newGrid[position[0]][position[1]] = 0;
      else newGrid[position[0]][position[1]] = Number(value);
      this.setState({grid: newGrid})
      storageService.setBoard(newGrid);
    }
  }



    showProgress = async (progress) => {
    this.setState({isGridDisabled: true})
    for (const gridi of progress) {
      this.setState({grid: gridi})
      await new Promise((resolve) => setTimeout(resolve, this.state.progressSpeed));
    }
    this.setState({isSolved: true, isSolving: false})
   
  }


      handleSolveButtonClicked ()
     {
    this.setState({isSolving: true, isSolved: false, startGrid: this.state.grid.map((arr) => arr.slice())})
    const progress = sudokuService.solve(this.state.grid);
    if (this.state.isShowProcessChecked) {
      this.showProgress(progress);
    } else 
    {

      this.setState({
        isGridDisabled: true, 
        grid: progress[progress.length - 1],
        isSolved: true,
        isSolving: false
      });
    }
  }
  


   reset()
  {
    this.setState({
      grid: EMPTY_GRID(),
      startGrid: EMPTY_START_GRID(),
      isGridDisabled: false,
      isSolved: false,

    })

    storageService.setBoard(EMPTY_GRID());
  }

   undo()
  {
    this.setState({
      isGridDisabled: false,
      grid: this.state.startGrid,
      startGrid: EMPTY_START_GRID(),
      isSolved: false
    })
  }

  render() 
  {

    return (
      <Row className="mt-4">
        <Col sm={8} className="mb-5">
          <Board
            startGrid={this.state.startGrid}
            grid={this.state.grid}
            onChange={this.handleValueChange}
            disabled={this.state.isGridDisabled}
          />
        </Col>
        <Col lg className="mb-5">
          <Card className="shadow">
            <Card.Body>
              <Button
                variant="dark"
                disabled={this.state.isSolving}
                onClick={() => {
                  this.reset();
                  const randomGrid = sudokuService.getRandomExample();
                  this.setState({grid: randomGrid})
                  storageService.setBoard(randomGrid);
                }}
              >
                Random Board
              </Button>
              <br />
              {this.state.isSolving ? (
                <Button
                  className="mt-3"
                  variant="dark"
                  onClick={() => window.location.reload()}
                >
                  Stop
                </Button>
              ) : (
                <Button
                  className="mt-3"
                  variant="dark"
                  onClick={this.handleSolveButtonClicked}
                >
                  Solve
                </Button>
              )}
              <FormCheck
                className="mt-3"
                type="checkbox"
                label="Show solving process"
                disabled={this.state.isSolving}
                checked={this.state.isShowProcessChecked}
                onChange={(e) => this.setState({isShowProcessChecked: e.target.checked})}

              />
              {this.state.isShowProcessChecked ? (
                <p className="mt-3 text-danger">
                  Animation might take long time :(
                </p>
              ) : (
                ""
              )}
              <Button
                className="mt-3 mr-1"
                variant="dark"
                disabled={this.state.isSolving}
                onClick={this.reset}
              >
                Clear
              </Button>
              <Button
                className="mt-3 ml-1"
                variant="dark"
                disabled={!this.state.isSolved}
                onClick={this.undo}
              >
                <i className="fas fa-undo" />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
  }


