import styled from "styled-components";
import {buttonColorMain, formBorderColor, textFormColor, textFormStyle} from "../../styles/Styles.tsx";
import {StyledFormField} from "../FormField/StyledFormField.tsx";
import {Link} from "react-router-dom";

export const StyledLoginForm = styled.form`
    margin-top: 67px;
    width: 340px;
    height: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: solid 2px ${formBorderColor};
    border-radius: 10px;

    h1 {
        font-size: 20pt;
        margin-top: 22px;
        ${textFormStyle};
    }
`

export const StyledFieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${StyledFormField} {
        margin-top: 20px;
    }

    ${StyledFormField}:first-child {
        margin-top: 3px;
    }

    ${StyledFormField}:last-child img {
        width: 26px;
        height: 26px;
        right: 7px;
    }
`

export const StyledRememberPasswordBlock = styled.div`
    width: 90%;
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;

        p {
            ${textFormStyle};
            margin-left: 7px;
        }
    }
`
export const StyledLink = styled(Link)`
    text-decoration: none;
    margin-right: 7px;
    ${textFormStyle};
    font-weight: 800;
`

export const StyledCheckbox = styled.input`
    width: 20px;
    height: 20px;
`

export const StyledFormButton = styled.button`
    margin-top: 10px;
    width: 266px;
    height: 38px;

    border: none;
    ${textFormStyle};
    color: ${textFormColor};
    font-size: 12pt;
    background-color: ${buttonColorMain};
    border-radius: 5px;
`

export const StyledRegisterBlock = styled(StyledRememberPasswordBlock)`
    display: block;
    text-align: center;
    margin-top: 12px;

    p {
        margin-right: 10px;
        margin-left: 10px;
        display: inline-block;
        ${textFormStyle};
        font-weight: 599;
        font-size: 11pt;
    }

`