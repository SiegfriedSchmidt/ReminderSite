import React from 'react';
import {StyledEventRow} from "./StyledEventRow.tsx";

const EventRow = () => {
  return (
    <StyledEventRow>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </td>
      <td>
        <p>01.01</p>
        <p>1970</p>
      </td>
      <td>
        365
      </td>
    </StyledEventRow>
  );
};

export default EventRow;