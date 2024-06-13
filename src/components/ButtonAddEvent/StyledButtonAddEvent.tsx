import styled from "styled-components";

export const StyledButtonAddEvent = styled.button`
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
        top: 2px;
        position: relative;
    }

    &:hover {
        transform: scale(1.08);
        background-color: #ffc224;
    }


`
