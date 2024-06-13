import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

export const StyledEventRow = styled.tr`
    border-radius: 3px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    td {
        padding: 0.5rem 0 0.5rem 0;
        text-align: center;
        font-size: 1rem;
        ${textStyle}
    }

    td:first-child {
        padding-left: 0.8rem;
        text-align: left;
    }

    td p {
        padding-left: 0;
        font-size: 1rem;
        ${textStyle}
    }
`