import React from "react";
import { Container } from "react-bootstrap";
import SudokuSolver from "./Components/SudokuSolver";


function App() {
  return (
    <Container className="text-center">
      <h1 className="mt-3">Sudoku Solver</h1>
      <hr />
      <SudokuSolver></SudokuSolver>
    </Container>
  );
}


export default App;
