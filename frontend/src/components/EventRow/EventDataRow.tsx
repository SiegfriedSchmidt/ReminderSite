import React, {FC} from 'react';
import {StyledEventRow} from "../EventsTable/StyledEventRow.tsx";
import {StyledEventCell} from "../EventsTable/StyledEventCell.tsx";
import EventData from "../../types/EventData.ts";
import getSeparateDate from "../../utils/getSeparateDate.ts";
import {useNavigate} from "react-router-dom";

interface EventDataRowInterface {
  data: EventData;
  idx: number
}

const EventDataRow: FC<EventDataRowInterface> = ({data, idx}) => {
  const navigate = useNavigate();

  function onClick() {
    navigate("/event/" + idx);
  }

  return (
    <StyledEventRow onClick={onClick}>
      <StyledEventCell><p>{data.title}</p></StyledEventCell>
      <StyledEventCell><p>{getSeparateDate(data.date)}</p></StyledEventCell>
      <StyledEventCell><p>{data.until}</p></StyledEventCell>
    </StyledEventRow>
  );
};

export default EventDataRow;