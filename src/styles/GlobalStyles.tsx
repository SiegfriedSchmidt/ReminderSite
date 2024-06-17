import {createGlobalStyle} from "styled-components";
import {widthLimit} from "./Styles.tsx";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    input {
        outline: none;
    }
    
    #root {
        width: min(100%, ${widthLimit});
        margin: auto;
    }
`

export default GlobalStyles