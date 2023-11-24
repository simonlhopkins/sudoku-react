import styled from "styled-components";
import SudokuSquare from "./SudokuSquare";
import { SudokuSectionCoord, getIndexiesInSection, getSudokuBoardCoordFromIndex, getSudokuSectionCoordFromIndex } from "../util/Util";
import { NotesArray, NotesMap } from "../util/gamestate";


interface SudokuSectionProps {

    sectionCoord: SudokuSectionCoord
    populatedBoard: (number | null)[],
    solvedBoard: (number | null)[],
    startingBoard: (number | null)[];
    onSquareClick: (index:number) => void,
    focussedIndex: number
    notes: NotesMap
}



export default function SudokuSection({sectionCoord, startingBoard, populatedBoard, solvedBoard, onSquareClick, focussedIndex, notes }: SudokuSectionProps) {

    
    
    function getIsHighlighted(index:number, focussedIndex:number){
        const assocSection = getSudokuSectionCoordFromIndex(index);
        const focussedSection = getSudokuSectionCoordFromIndex(focussedIndex);
        const assocBoardCoord = getSudokuBoardCoordFromIndex(index);
        const focussedBoardCoord = getSudokuBoardCoordFromIndex(focussedIndex);
        const sameRowOrCol = assocBoardCoord.row == focussedBoardCoord.row || assocBoardCoord.col == focussedBoardCoord.col;
        const sameSection = (assocSection.row == focussedSection.row && assocSection.col == focussedSection.col);
        return sameSection || sameRowOrCol;
    }

    
    let sectionIndecies = getIndexiesInSection(sectionCoord);
    let sectionSolved = sectionIndecies.filter((index)=>{ return populatedBoard[index] != solvedBoard[index] }).length==0;
    
    let squares = sectionIndecies.map((index:number)=>{
        const numberToRender = populatedBoard[index];
        const actuallyValidPos = solvedBoard[index] == numberToRender;
        return (<SudokuSquare
        key={index}
        number={numberToRender}
        index = {index}
        correctPosition = {actuallyValidPos}
        letterHighlighted = {(numberToRender == populatedBoard[focussedIndex])}
        focussed={focussedIndex == index}
        backgroundHighlighted={getIsHighlighted(index, focussedIndex)}
        immutable={startingBoard[index] != null}
        onClicked={onSquareClick}
        notes= {notes.get(index)}
        />);
    });

    return (
        <StyledSudokuSection className={sectionSolved?"solved":""}>
            {squares}
        </StyledSudokuSection>
    )
}

const StyledSudokuSection = styled.div`
    display: grid;
    border: 1px solid ${props => props.theme.colors.BEIGE.DARK};
    box-sizing: border-box;
    grid-template-columns: repeat(3, 1fr);
    transition: border 0.2s ease;
    &.solved{
        border:4px solid ${props => props.theme.colors.GREEN};
    }
`