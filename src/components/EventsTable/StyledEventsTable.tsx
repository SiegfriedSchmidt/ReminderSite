import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

export const StyledEventsTable = styled.div`
    border: 2px black solid;
    border-radius: 10px;
    width: calc(100% - 12px);
    align-self: center;
    margin-top: 1rem;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0.6rem;
    
    tr {
        display: block;
        vertical-align: middle;
    }

    td img {
        padding-left: 0.2rem;
    }
    
    td {
        display: inline-block;
        text-align: center;
        font-size: 1.2rem;
        padding: 0.5rem 0 0.5rem 0;
        ${textStyle}
    }
    
    td:first-child {
        width: calc(100% - 9rem);
        padding-left: 0.8rem;
        text-align: left;
    }
    
    td:nth-child(2) {
        width: 5rem;
    }

    td:nth-child(3) {
        width: 4rem;
    }
`