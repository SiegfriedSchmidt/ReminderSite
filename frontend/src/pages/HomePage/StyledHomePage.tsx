import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

export const Container = styled.div`
    padding-top: 1rem;
    display: flex;
    flex-direction: column;

    p {
        ${textStyle};
        padding-left: 1rem;
        font-size: 1.3rem;
    }
`