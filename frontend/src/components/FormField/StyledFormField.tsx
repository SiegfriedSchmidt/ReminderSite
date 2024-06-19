import styled from "styled-components";
import {textFormColor, textFormStyle, textPlaceholderColor} from "../../styles/Styles.tsx";

export const StyledFormField = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

    input {
        padding: 0.5rem 0 0.4rem 0.2rem;
        width: 266px;
        ${textFormStyle};
        border: none;
        border-bottom: 2px solid ${textFormColor};
    }
        
    input::placeholder {
        color: ${textPlaceholderColor};
        font-weight: 750;
    }
    
    img {
        position: absolute;
        color: ${textFormColor};
        width: 21px;
        height: 21px;
        
        right: 9px;
        bottom: 8px;
        
    }
`