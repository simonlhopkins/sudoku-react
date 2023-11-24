import styled from "styled-components";

interface GameButtonsProps {
    undo: ()=>void,
    newGame: ()=>void,
    toggleNotes: ()=>void,
    showSolved: ()=>void,
    notesActive: boolean,
    canUndo: boolean
}

export default function GameButtons({canUndo, notesActive, undo, newGame, toggleNotes, showSolved} : GameButtonsProps){
    
    return (
    <GameButtonWrapper>
        <button onClick={() => {
          showSolved();
        }}>toggle solved</button>
        <button className={notesActive?"toggled":""} onClick={() => {
          toggleNotes()
        }}>notes</button>
        <button onClick={() => {
          newGame();
        }}>new game</button>
        <button onClick={() => { undo() }} disabled= {!canUndo}>undo</button>
      </GameButtonWrapper>)
}

const GameButtonWrapper = styled.div`
  display: flex;
  width: 100%;
    justify-content: space-between;

  button{
    padding: 1rem;
    border-radius: 10px;
    &.toggled{
        background-color: ${props=>props.theme.colors.GREEN};
    }
  }

`