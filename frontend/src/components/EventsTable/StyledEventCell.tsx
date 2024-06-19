import styled from "styled-components";
import {textStyle, widthLimit} from "../../styles/Styles.tsx";

export const StyledEventCell = styled.div`
    margin: auto;
    display: inline-block;
    text-align: center;
    font-size: 1.2rem;
    padding: 0.5rem 0 0.5rem 0;

    ${textStyle}
    img {
        padding-left: 0.2rem;
    }

    &:first-child {
        padding-left: 0.8rem;
        text-align: left;
    }
    
    @media (width <= ${widthLimit}) {
        &:first-child {
            width: calc(100% - 9rem);
        }

        &:nth-child(2) {
            width: 5rem;
        }

        &:nth-child(3) {
            width: 4rem;
        }
    }

    @media (width > ${widthLimit}) {
        &:first-child {
            width: calc(100% - 12rem);
        }

        &:nth-child(2) {
            width: 8rem;
        }

        &:nth-child(3) {
            width: 4rem;
        }
    }
`