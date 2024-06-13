import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

export const StyledEventsTable = styled.table`
    border: 2px black solid;
    border-radius: 10px;
    width: calc(100% - 12px);
    align-self: center;
    margin-top: 1rem;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0.6rem;

    th {
        padding-bottom: 1rem;
        text-align: left;
        ${textStyle}
    }
    
    th img {
        padding-left: 0.4rem;
    }

    th:nth-child(2) {
        width: 5rem;
    }

    th:last-child {
        width: 3rem;
    }
`