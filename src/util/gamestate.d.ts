import { SudokuArray } from "./Util"

export type SudokuCellData = {
    index: number
    value: number|null,
    notes: number[],
    isStarting: boolean
}
export interface GameState {
    populatedBoard: SudokuArray
    startingBoard: SudokuArray
    solvedBoard: SudokuArray,
    score: number
    focussedIndex: focussedIndex,
    history: HistoryEntry[],
    notes: NotesMap
}

export type NotesMap = Map<number, Set<number>>
export type NotesArray = number[][];
export type HistoryEntry = {
    index: number,
    prevValue: number|null,
    newValue: number|null
}
