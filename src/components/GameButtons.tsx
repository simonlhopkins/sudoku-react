import styled from "styled-components";

interface GameButtonsProps {
    undo: ()=>void,
    newGame: ()=>void,
    toggleNotes: ()=>void,
    showSolved: ()=>void
    notesActive: boolean
}

export default function GameButtons({notesActive, undo, newGame, toggleNotes, showSolved} : GameButtonsProps){
    
    return (
    <GameButtonWrapper>
        <button onClick={() => {
          showSolved();
        }}>toggle solved</button>
        <button onClick={() => {
          toggleNotes()
        }}>notes: {notesActive?"on":"off"}</button>
        <button onClick={() => {
          newGame();
        }}>new game</button>
        <button onClick={() => { undo() }}>undo</button>
      </GameButtonWrapper>)
}

const GameButtonWrapper = styled.div`
  display: flex;
  width: 100%;
    justify-content: space-between;

  button{
    padding: 1rem;
    background-color: ${props => props.theme.colors.BEIGE.BASE};
    border: 2px solid ${props=>props.theme.colors.BEIGE.DARK};
    border-radius: 10px;
    
    transition: max-width 0.3s ease;

  }

`