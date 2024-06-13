import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        font-family: Nunito, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    #root {
        width: min(100%, 640px);
        margin: auto;
    }
`

export default GlobalStyles