import React from 'react';
import {StyledEventsTable} from "./StyledEventsTable.tsx";
import ascendingIcon from "../../assets/ascending.svg"
import EventDataRow from "../EventRow/EventDataRow.tsx";
import ButtonAddEvent from "../ButtonAddEvent/ButtonAddEvent.tsx";
import {StyledEventRow} from "./StyledEventRow.tsx";
import {StyledEventCell} from "./StyledEventCell.tsx";
import EventHeadRow from "../EventRow/EventHeadRow.tsx";

const EventsTable = () => {
    return (
      <div style={{position: "relative"}}>
        <StyledEventsTable>
          <EventHeadRow/>
          <EventDataRow/>
          <EventDataRow/>
          <EventDataRow/>
          <EventDataRow/>
          <EventDataRow/>
          <EventDataRow/>
          <EventDataRow/>
          <EventDataRow/>
        </StyledEventsTable>
        <ButtonAddEvent/>
      </div>
    );
  }
;

export default EventsTable;