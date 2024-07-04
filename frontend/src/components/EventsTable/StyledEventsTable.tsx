import styled from "styled-components";

export const StyledEventsTable = styled.div`
    overflow-y: scroll;
    box-sizing: border-box;
    border: 2px black solid;
    height: 70vh;
    border-radius: 10px;
    width: calc(100% - 12px);
    margin: 1rem auto auto auto;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0 0 90px 0;
    
    &::-webkit-scrollbar {
        display: none;
    }
`