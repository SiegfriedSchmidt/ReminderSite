import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

export const Container = styled.div`
    position: relative;
    width: 100%;
    padding: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: start;

    h1 {
        font-size: 1.1rem;
    }

    img {
        position: absolute;
        right: 14px;
        bottom: 13px;
    }
`

export const StyledEditInput = styled.input`
    width: 100%;
    margin-top: 0.6rem;
    height: 35px;
    padding-left: 10px;
    padding-right: 30px;
    ${textStyle};
    font-size: 1rem;
    font-weight: 710;
    border-radius: 5px;
    border: solid 1px #DDDBDB;
`

export const StyledEditTextarea = styled.textarea`
    width: 100%;
    margin-top: 0.5rem;
    height: 190px;
    ${textStyle};
    font-weight: 710;
    font-size: 1.1rem;
    border-radius: 5px;
    border: solid 1px #DDDBDB;
    padding: 8px 14px 10px 12px;
`