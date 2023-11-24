import { useEffect, useState } from "react"
import styled from "styled-components";

interface CursorPlacerProps {
    number: number
}

export default function CursorPlacer({number}:CursorPlacerProps) {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        document.onmousemove = (event:MouseEvent) => {
            setPosition({x: event.clientX, y: event.clientY});
        }
    })
    return (
        <Cursor style={{ left: position.x, top: position.y }}>
            <p>{number}</p>
        </Cursor>
    )
}

const Cursor = styled.div`
    position: absolute;
    font-size: 3rem;
    transform: translateY(-50%);
    
`