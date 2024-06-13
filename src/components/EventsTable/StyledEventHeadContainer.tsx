import styled from "styled-components";
import {StyledEventRow} from "./StyledEventRow.tsx";

export const StyledEventHeadContainer = styled.div`
    position: sticky;
    top: 0;

    background-color: white;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    ${StyledEventRow} {
        margin-top: 0;
        border-radius: 0;
        box-shadow: none;
    }
`