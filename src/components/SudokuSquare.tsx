import styled from "styled-components"
interface SudokuSquareProps{
    number: number | null,
    immutable: boolean,
    backgroundHighlighted: boolean,
    letterHighlighted: boolean,
    correctPosition: boolean,
    onClicked: (index:number, immutable:boolean)=>void,
    index: number,
    focussed: boolean,
    notes: undefined | Set<number>
}

export default function SudokuSquare({number, index, onClicked, immutable, correctPosition, focussed, backgroundHighlighted, letterHighlighted, notes}:SudokuSquareProps){

    const incorrectPosition = !correctPosition && number!=null;
    const classes = [
        (focussed&&!immutable)&&"focussed",
        immutable&&"immutable",
        incorrectPosition&&"incorrectPosition",
        backgroundHighlighted&&"backgroundHighlighted",
        letterHighlighted&&"letterHighlighted"
    ]
    .filter(Boolean)
    .join(" ");

    

    return(
        <SudokuSquareParent

            className={classes}
            onClick={()=>{
                onClicked(index, immutable)
            }}
        >
            {number==null&&<SquareNotes>
                {[...Array(9).keys()].map(i=><div key ={i}><p>{notes&&notes.has(i)?i+1:""}</p></div>)}
            </SquareNotes>}
            <span>{number==null?"":number+1}</span>
        </SudokuSquareParent>
    )
}

const SquareNotes = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 5%;
    >div{
        @media only screen and (min-width: 500px){
            font-size: 16px;
        }
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;
        color: ${props => props.theme.colors.PINK};
        p{
            margin: 0;
        }
    }
`

const SudokuSquareParent = styled.div`
    position: relative;
    border: 1px solid ${props => props.theme.colors.BEIGE.DARK};
    background-color: ${props => props.theme.colors.BEIGE.BASE};
    display: flex;
    box-sizing: border-box;
    align-items: center;
    aspect-ratio: 1;
    justify-content: center;
    font-size: 1rem;
    -webkit-user-select: none;
    user-select:none;
    transition-property: color, background-color, border;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    
    span{
        z-index: 1;
    }
    @media only screen and (min-width: 500px){
        font-size: 2rem;
    }
    &.immutable{
        background-color: ${props => props.theme.colors.BEIGE.MEDIUM};
    }
    &.backgroundHighlighted{
        background-color: ${props => props.theme.colors.YELLOW.BASE};
        &.immutable{
            background-color: ${props => props.theme.colors.YELLOW.DARK};
        }
        
    }
    &.focussed {
        border: 3px solid ${props => props.theme.colors.GREEN};
        background-color: ${props => props.theme.colors.BEIGE.DARK};
    }

    &.incorrectPosition{
        background-color: ${props => props.theme.colors.RED};
    }
    &.letterHighlighted{
        color: ${props => props.theme.colors.GREEN};
    }
`