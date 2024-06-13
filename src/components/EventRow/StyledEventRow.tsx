import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

export const StyledEventRow = styled.tr`
    display: block;
    border-radius: 3px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 10px;

    
    td p {
        padding-left: 0;
        font-size: 1.2rem;
        ${textStyle}
    }
`