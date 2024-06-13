import styled from "styled-components";
import {Link} from "react-router-dom";

export const StyledButtonAddEvent = styled(Link)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    background-color: #F1D282;
    position: absolute;
    right: calc(6px + 20px);
    bottom: 20px;
    transition: 0.5s;

    img {
        transform: translate(21px, 21px);
    }

    &:hover {
        transform: scale(1.08);
        background-color: #ffc224;
    }


`
