import React from 'react';
import {StyledEventsTable} from "./StyledEventsTable.tsx";
import ascendingIcon from "../../assets/ascending.svg"
import EventRow from "../EventRow/EventRow.tsx";
import ButtonAddEvent from "../ButtonAddEvent/ButtonAddEvent.tsx";

const EventsTable = () => {
    return (
      <div style={{position: "relative"}}>
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
          <EventRow/>
          <EventRow/>
          <EventRow/>
        </StyledEventsTable>
        <ButtonAddEvent/>
      </div>
    );
  }
;

export default EventsTable;