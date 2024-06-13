import styled from "styled-components";

export const StyledEventRow = styled.div`
    display: flex;
    margin: 0.6rem 0.6rem 0 0.6rem;
    border-radius: 3px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    // first row

    &:nth-child(2) {
        margin-top: 0;
    }
`