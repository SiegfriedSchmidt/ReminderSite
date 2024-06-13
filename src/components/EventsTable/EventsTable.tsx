import React from 'react';
import {StyledEventsTable} from "./StyledEventsTable.tsx";
import ascendingIcon from "../../assets/ascending.svg"
import EventRow from "../EventRow/EventRow.tsx";

const EventsTable = () => {
  return (
    <StyledEventsTable>
      <tr>
        <th>Название<img src={ascendingIcon} alt="sort"/></th>
        <th>Дата<img src={ascendingIcon} alt="sort"/></th>
        <th>До<img src={ascendingIcon} alt="sort"/></th>
      </tr>
      <EventRow/>
      <EventRow/>
      <EventRow/>
      <EventRow/>
      <EventRow/>
    </StyledEventsTable>
  );
};

export default EventsTable;