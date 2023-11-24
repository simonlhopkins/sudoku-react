import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
        box-sizing: border-box;
        margin: 0;
        padding: 10px;
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.colors.BEIGE.BASE};
        font-family: 'Arial', Helvetica, sans-serif;


    }

    button{
        background-color: ${props => props.theme.colors.BEIGE.BASE};
        border: 2px solid ${props => props.theme.colors.BEIGE.DARK};
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-user-select: none;
        user-select:none;
        transition: background-color 0.2s ease;
        &:not([disabled]){
            &:active{
                background-color: #a3a3a3
            }
        }
        &:disabled{
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
`

export default GlobalStyle;