import { useEffect, useState } from "react";
import { GameState, HistoryEntry, NotesMap } from "../util/gamestate";
import { SudokuArray } from "../util/Util";
import { makepuzzle, solvepuzzle } from "../util/sudoku";

const sudokuData = localStorage.getItem("sudokuData");
const initBoard =  makepuzzle(solvepuzzle(Array(81).fill(null)), "simon") as Array<number | null>;
const initSolvedBoard =  solvepuzzle(initBoard) as Array<number>;
const initData: GameState = sudokuData?JSON.parse(sudokuData, gameStateReviver) as GameState:
{
    populatedBoard: initBoard,
    startingBoard: initBoard,
    solvedBoard: initSolvedBoard,
    score: 0,
    focussedIndex: 0,
    history: [],
    notes: new Map()
}
export default function useGameState():
    [
        GameState, 
        (index:number)=>void,
        (newPopulatedBoard: SudokuArray, newSolvedBoard: SudokuArray) => void,
        (value: number|null) => void,
        () => void,
        (number:number|null)=>void
    ]
{

    const [startingBoard, setStartingBoard] = useState<SudokuArray>(initData.startingBoard);
    //apply the history here
    const [populatedBoard, setPopulatedBoard] = useState<SudokuArray>(initData.populatedBoard);
    const [solvedBoard, setSolvedBoard] = useState<SudokuArray>(initData.solvedBoard);
    const [score, setScore] = useState<number>(initData.score);
    const [focussedIndex, _setFocussedIndex] = useState<number>(initData.focussedIndex);
    const [notes, setNotes] = useState<NotesMap>(initData.notes);
    const [history, setHistory] = useState(initData.history);
    useEffect(()=>{
        localStorage.setItem("sudokuData", JSON.stringify({
            startingBoard: startingBoard,
            solvedBoard: solvedBoard,
            populatedBoard: populatedBoard,
            score: 0,
            history: history,
            notes: notes,
            focussedIndex: focussedIndex
        } as GameState, gameStateReplacer));
    }, [populatedBoard, notes])
      
    const setFocussedIndex = (newFocussedIndex:number)=>{
        if(newFocussedIndex!=focussedIndex){
            _setFocussedIndex(newFocussedIndex);
        }
    }

    const resetBoard = (newPopulatedBoard:SudokuArray, newSolvedBoard:SudokuArray)=>{
        
        setStartingBoard(newPopulatedBoard);
        setPopulatedBoard(newPopulatedBoard);
        setSolvedBoard(newSolvedBoard);
        setScore(0);
        setHistory([]);
        setNotes(new Map());
    }

    const setFocussedSquareValue = (newValue:number|null)=>{
        if(populatedBoard[focussedIndex] != newValue){
            let newPopulatedBoard = [...populatedBoard];
            newPopulatedBoard[focussedIndex] = newValue;
            if(newValue!=null && newValue != solvedBoard[focussedIndex]){
                setScore(prev=>prev+1);
            }
            setHistory(prevHistory=>[...prevHistory, {
                index: focussedIndex,
                prevValue: populatedBoard[focussedIndex],
                newValue: newValue
            }]);
            setPopulatedBoard(newPopulatedBoard);
        }
    }

    const handleUndo = ()=>{
        
        if(history.length>0){
            const previousHistory = [...history];
            const lastItem = previousHistory.pop() as HistoryEntry;
            let prevBoard = [...populatedBoard];
            prevBoard[lastItem.index] = lastItem.prevValue;
            setPopulatedBoard(prevBoard);
            setHistory(previousHistory);
            setFocussedIndex(lastItem.index);
        }else{
            setPopulatedBoard(startingBoard);
            setHistory([]);
        }
        
    }

    const setNote = (number:number|null)=>{
        const newNotes = new Map(notes);
        if(!newNotes.has(focussedIndex)) newNotes.set(focussedIndex, new Set());
        if(number!=null){
            newNotes.get(focussedIndex)?.has(number)?newNotes.get(focussedIndex)?.delete(number):newNotes.get(focussedIndex)?.add(number);
            
        }else{
            newNotes.delete(focussedIndex);
        }
        if(populatedBoard[focussedIndex]!=null){
            setFocussedSquareValue(null);
        }
        setNotes(newNotes)
    }

    return [
        {
            populatedBoard: populatedBoard,
            solvedBoard: solvedBoard,
            startingBoard: startingBoard,
            score: score,
            focussedIndex: focussedIndex,
            history: history,
            notes: notes
        }
        , setFocussedIndex, resetBoard, setFocussedSquareValue, handleUndo, setNote];
}


function gameStateReviver(key: string, value: any){
    if(key == "notes"){
        return new Map(value.map((item:{key:number, value: number[]})=>[item.key, new Set<number>(item.value)])) as NotesMap;
    }
    return value;
}

function gameStateReplacer(key:string, value:any){
    if(key == "notes"){
        return [...value].map(([key, value])=>({key: key, value: Array.from(value)}));
    }
    return value;
}
