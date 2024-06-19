import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

export const StyledEventPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 17px 24px 0 24px;

    h1 {
        ${textStyle};
        font-size: 1.3rem;
    }
`

export const StyledEventEditBlock = styled.div`
    margin-top: 0.3rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
`

export const StyledButtonEditBlock = styled.div`
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`