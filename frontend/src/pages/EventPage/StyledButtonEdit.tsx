import styled from "styled-components";
import {buttonColorMain, textStyle} from "../../styles/Styles.tsx";

export const StyledButtonEdit = styled.button`
    ${textStyle};
    width: 140px;
    padding: 0.6rem 0 0.6rem 0;
    font-size: 1.2rem;
    border-radius: 10px;
    border: none;
    background-color: ${buttonColorMain};
`