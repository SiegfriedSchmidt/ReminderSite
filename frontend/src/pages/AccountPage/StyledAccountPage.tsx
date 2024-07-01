import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";
import {StyledFormButton} from "../../components/LoginForm/StyledLoginform.tsx";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
    
    & > h1 {
        ${textStyle};
        font-size: 18pt;
        margin-top: 10px;
    }
    
    p {
        ${textStyle};
        font-size: 15pt;
    }
`

export const Header = styled.h2`
    ${textStyle};
    font-size: 16pt;
    margin-top: 10px;
`

export const SettingsContainer = styled.div`
    width: 367px;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 10px;
`

export const StyledExitButton = styled(StyledFormButton)`
    margin-top: 16px;
    align-self: center;
`