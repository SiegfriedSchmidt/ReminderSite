import React from 'react';
import {StyledEventRow} from "./StyledEventRow.tsx";

const EventRow = () => {
  return (
    <StyledEventRow>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit{/*Lorem ipsum dolor sit amet, consectetur adipiscing elit*/}
      </td>
      <td>
        01.01 1970
      </td>
      <td>
        365
      </td>
    </StyledEventRow>
  );
};

export default EventRow;