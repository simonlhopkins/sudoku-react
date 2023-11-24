import { useState } from 'react'
import SudokuBoard from './components/SudokuBoard';
import { makepuzzle, solvepuzzle } from './util/sudoku';
import NumberSelector from './components/NumberSelector';
import styled, { ThemeProvider } from 'styled-components';
import useGameState from './components/useGameState';
import GlobalStyle from './themes/globalStyles';
import theme from './themes/theme';
import GameButtons from './components/GameButtons';

let i = 0;
//when you press new game it animates between random boards and you have to stop the screen.
function App() {
  const [showSolved, setShowSolved] = useState(false);
  const [takeNotes, setTakeNotes] = useState(false);
  const [gameState, setFocussedIndex, resetBoard, setFocussedSquare, handleUndo, setNote] = useGameState();
  const onSquareClick = (index: number) => {
    setFocussedIndex(index);
  }


  const setNewGame = () => {
    const newPopulatedBoard = makepuzzle(solvepuzzle(Array(81).fill(null)), ++i) as Array<number | null>;
    const newSolvedPuzzle = solvepuzzle(newPopulatedBoard) as Array<number>;
    resetBoard(newPopulatedBoard, newSolvedPuzzle);
  }

  const onNumberClick = (number: number | null) => {
    if (takeNotes) {
      setNote(number);
    } else {
      setFocussedSquare(number);
      if (number == null && gameState.solvedBoard[gameState.focussedIndex] == gameState.populatedBoard[gameState.focussedIndex]) {
        console.log("why")
      }
    }

  }

  const puzzleToRender = showSolved ? gameState.solvedBoard : gameState.populatedBoard;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {/* <h1>mistakes: {gameState.score}</h1> */}
      <GameHeader>sudoku for amber</GameHeader>
      <GameWrapper>
        <SudokuBoard
          populatedBoard={puzzleToRender}
          solvedBoard={gameState.solvedBoard}
          startingBoard={gameState.startingBoard}
          onSquareClick={onSquareClick}
          focussedIndex={gameState.focussedIndex}
          notes={gameState.notes}
        />
        <GameButtons
          undo= {handleUndo}
          newGame = {setNewGame}
          toggleNotes= {()=>{setTakeNotes(prev=>!prev)}}
          showSolved = {()=>{setShowSolved(prev=>!prev)}}
          notesActive = {takeNotes}
          canUndo = {gameState.history.length>0}
        />
        {
          !showSolved && <NumberSelector
            onClicked={onNumberClick}
            currentNumber={puzzleToRender[gameState.focussedIndex]}
            currentIndexSolved={gameState.solvedBoard[gameState.focussedIndex] == puzzleToRender[gameState.focussedIndex]}
            disableBackspace={gameState.startingBoard[gameState.focussedIndex] != null}
          />

        }
        {/* <ul>{gameState.history.map((item, i) => (<li key={i}>{`${item.index} changed from ${item.prevValue} to ${item.newValue}`}</li>))}</ul> */}
      </GameWrapper>


    </ThemeProvider>
  )
}

const GameWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`

const GameHeader = styled.h1`
  color: ${props=>props.theme.colors.BEIGE.DARK}
`

export default App
