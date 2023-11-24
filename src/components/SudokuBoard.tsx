import styled from "styled-components";
import SudokuSection from "./SudokuSection";
import { SudokuArray } from "../util/Util";
import { NotesMap } from "../util/gamestate";

interface SudokuBoardProps {
    populatedBoard: SudokuArray,
    solvedBoard: SudokuArray,
    startingBoard: SudokuArray
    focussedIndex: number,
    onSquareClick: (number:number)=>void,
    notes: NotesMap
}




export default function SudokuBoard({populatedBoard, startingBoard, focussedIndex, solvedBoard, onSquareClick, notes}: SudokuBoardProps){
    let sections = [];
    for(let sectionRow = 0; sectionRow< 3; sectionRow++){
        for(let sectionCol = 0; sectionCol< 3; sectionCol++){
            const index = sectionRow*3 + sectionCol;
            sections.push(<SudokuSection
                key={index}
                sectionCoord= {{ row: sectionRow, col: sectionCol}}
                populatedBoard={populatedBoard}
                solvedBoard={solvedBoard}
                startingBoard={startingBoard}
                onSquareClick={onSquareClick}
                focussedIndex={focussedIndex}
                notes= {notes}            
                />);
        }
    }

    return (
        <SudokuBoardParent className="sudokuBoardParent">
            {sections}
        </SudokuBoardParent>
    );
}


const SudokuBoardParent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    
    box-sizing: border-box;
    border: 4px solid ${props => props.theme.colors.BEIGE.MEDIUM};
`



  