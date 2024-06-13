import React from 'react';
import {StyledEventRow} from "../EventsTable/StyledEventRow.tsx";
import {StyledEventCell} from "../EventsTable/StyledEventCell.tsx";

const EventDataRow = () => {
  return (
    <StyledEventRow>
      <StyledEventCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</StyledEventCell>
      <StyledEventCell>01.01 1970</StyledEventCell>
      <StyledEventCell>365</StyledEventCell>
    </StyledEventRow>
  );
};

export default EventDataRow;