import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

export const StyledEventsTable = styled.div`
    overflow: scroll;
    box-sizing: border-box;
    border: 2px black solid;
    height: 70vh;
    border-radius: 10px;
    width: calc(100% - 12px);

    margin: 1rem auto auto;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0 0 0.6rem 0;
    
    tr {
        margin: 0.6rem 0.6rem 0 0.6rem;
        display: block;
        vertical-align: middle;
    }

    tr:first-child {
        margin: 0;
        position: sticky;
        top: 0;
        background-color: white;
        box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
    }

    tr:nth-child(2) {
        margin-top: 0;
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
        padding-left: 0.8rem;
        text-align: left;
    }


    @media (width <= 640px) {
        td:first-child {
            width: calc(100% - 9rem);
        }

        td:nth-child(2) {
            width: 5rem;
        }

        td:nth-child(3) {
            width: 4rem;
        }
    }

    @media (width > 640px) {
        td:first-child {
            width: calc(100% - 12rem);
        }

        td:nth-child(2) {
            width: 8rem;
        }

        td:nth-child(3) {
            width: 4rem;
        }
    }


`