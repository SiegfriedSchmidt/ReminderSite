import styled from "styled-components";
import {StyledEventRow} from "./StyledEventRow.tsx";

export const StyledEventHeadContainer = styled.div`
    position: sticky;
    top: 0;

    background-color: white;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    ${StyledEventRow} {
        box-shadow: inset 0 8px 4px -4px rgba(0, 0, 0, 0.25);
        border: none;
        margin-top: 0;
        border-radius: 0;
    }
`