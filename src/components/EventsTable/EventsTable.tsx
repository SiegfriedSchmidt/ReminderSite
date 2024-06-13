import React from 'react';
import {StyledEventsTable} from "./StyledEventsTable.tsx";
import ascendingIcon from "../../assets/ascending.svg"
import EventRow from "../EventRow/EventRow.tsx";

const EventsTable = () => {
  return (
    <StyledEventsTable>
      <tr>
        <td>Название<img src={ascendingIcon} alt="sort"/></td>
        <td>Дата<img src={ascendingIcon} alt="sort"/></td>
        <td>До<img src={ascendingIcon} alt="sort"/></td>
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