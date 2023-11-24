import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
        box-sizing: border-box;
        margin: 0;
        padding: 10px;
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.colors.BEIGE.BASE};

    }
`

export default GlobalStyle;