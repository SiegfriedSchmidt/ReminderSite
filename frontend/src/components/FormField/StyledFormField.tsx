import styled from "styled-components";
import {textFormColor, textFormStyle, textPlaceholderColor} from "../../styles/Styles.tsx";

export const StyledFormField = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

    input {
        padding: 0.5rem 36px 0.4rem 0.2rem;
        width: 266px;
        ${textFormStyle};
        font-size: 12pt;
        font-weight: 600;
        border: none;
        border-radius: 0;
        border-bottom: 2px solid ${textFormColor};
    }
    
    input[type="text"], input[type="email"] {
        text-overflow: ellipsis;
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