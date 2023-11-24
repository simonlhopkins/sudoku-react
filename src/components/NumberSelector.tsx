import styled from "styled-components"

import DeleteLeftSolid from '../assets/delete-left-solid.svg?react';

interface NumberSelectorProps{
    onClicked: (num:number|null)=>void,
    currentIndexSolved: boolean
    currentNumber: number|null
    disableBackspace: boolean
    
}


export default function NumberSelector({onClicked, currentIndexSolved, currentNumber, disableBackspace}:NumberSelectorProps){
    let numberButtons = [];
    for(let i = 0; i< 9; i++){
        let classes = [
            i==currentNumber&&"current"
        
        ].filter(Boolean).join(" ");
        
        numberButtons.push(<NumberSelectorButton 
            key = {i}
            disabled = {currentIndexSolved}
            className={classes}
            onClick={()=>{onClicked(i)}}
            onContextMenu = {(e)=>{e.preventDefault();}}
            ><p>{i+1}</p></NumberSelectorButton>);
    }

    return(
        <NumberSelectorParent >
            {numberButtons}
            <NumberSelectorButton className = {currentNumber==null?"current":""} disabled= {disableBackspace} onClick={()=>{onClicked(null)}}>
                {/* <StyledDeleteLeftSolid/> */}
            </NumberSelectorButton>
        </NumberSelectorParent>
    )
}


const NumberSelectorParent = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    gap: 0.1rem;
    
`

const NumberSelectorButton = styled.button`
    flex: 1;
    border-radius: 20px;
    aspect-ratio: 1;
    font-size: 2rem;
    color: ${props=>props.theme.colors.BEIGE.DARK};
    justify-content: center;
    align-items: center;
    background-color: ${props=>props.theme.colors.BEIGE.BASE};
    border: 2px solid ${props=>props.theme.colors.BEIGE.DARK};
    padding: 0px;
    -webkit-user-select: none;
    user-select:none;
    transition: background-color 0.2s ease;

    p{
        margin: 0;
    }
    &:disabled{
        opacity: 0.5;
        cursor: not-allowed;
    }
    &.current{
        background-color: white;
        color: ${props=>props.theme.colors.GREEN};;
    }
    &:not([disabled]){
        &:active{
            background-color: #a3a3a3
        }
    }
`