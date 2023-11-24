export type SudokuArray = Array<number | null>;
export type SudokuSectionCoord = {row:number, col:number}
export type SudokuBoardCoord = {row:number, col:number}

export function forEachInSection(section:SudokuSectionCoord, callback:(index:number)=>void){
     
    for (let row = section.row*3; row < section.row*3 + 3; row++) {
        for (let col = section.col*3; col < section.col*3 + 3; col++) {
            callback((row * 9) + col);
        }
    }
}

export function getIndexiesInSection(section:SudokuSectionCoord):number[]{
    let ret = [];
    for (let row = section.row*3; row < section.row*3 + 3; row++) {
        for (let col = section.col*3; col < section.col*3 + 3; col++) {
            ret.push((row * 9) + col);
        }
    }
    return ret;
}


export function getSudokuSectionFromCoord(coord:SudokuBoardCoord):SudokuSectionCoord{
    const row = Math.floor(coord.row/3);
    const col = Math.floor(coord.col/3);
    return {row:row, col:col};
}

export function getSudokuBoardCoordFromIndex(index:number):SudokuBoardCoord{
    const row = Math.floor(index/9);
    const col = index%9;
    return {row:row, col:col} as SudokuBoardCoord;
}

export function getSudokuSectionCoordFromIndex(index:number):SudokuBoardCoord{
    return getSudokuSectionFromCoord(getSudokuBoardCoordFromIndex(index))
}