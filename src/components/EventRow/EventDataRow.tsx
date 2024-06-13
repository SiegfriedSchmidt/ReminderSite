import React, {FC} from 'react';
import {StyledEventRow} from "../EventsTable/StyledEventRow.tsx";
import {StyledEventCell} from "../EventsTable/StyledEventCell.tsx";
import EventData from "../../types/EventData.ts";
import getSeparateDate from "../../utils/getSeparateDate.ts";

interface EventDataRowInterface {
  data: EventData;
}

const EventDataRow: FC<EventDataRowInterface> = ({data}) => {
  return (
    <StyledEventRow>
      <StyledEventCell>{data.title}</StyledEventCell>
      <StyledEventCell>{getSeparateDate(data.date)}</StyledEventCell>
      <StyledEventCell>{data.until}</StyledEventCell>
    </StyledEventRow>
  );
};

export default EventDataRow;