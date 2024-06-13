import styled from "styled-components";
import {textStyle} from "../../styles/Styles.tsx";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    a {
        text-decoration: none;
    }
    
    nav {
        padding-left: 0.6rem;
        padding-right: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    nav p {
        ${textStyle};
        font-size: 1.2rem;
        padding-left: 0.6rem;
    }
`

export default StyledHeader;
