import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

export const StyledSwitchWithText = styled.div`
    padding-left: 0.3rem;
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    
    h1 {
        ${textStyle};
        font-size: 14pt;
    }
`