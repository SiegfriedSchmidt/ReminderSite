import styled from "styled-components";
import {StyledFieldsWrapper, StyledFormButton} from "../LoginForm/StyledLoginform.tsx";
import {StyledFormField} from "../FormField/StyledFormField.tsx";

export const StyledRegisterFieldsWrapper = styled(StyledFieldsWrapper)`
    ${StyledFormField}:first-child img {
        width: 18px;
        height: 18px;
        right: 11px
    }
    
    ${StyledFormField}:nth-child(3) img {
        width: 26px;
        height: 26px;
        right: 7px
    }
`

export const StyledRegisterFormButton = styled(StyledFormButton)`
    margin-top: 20px;
`