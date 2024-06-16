import React, {useContext} from 'react';
import {StyledEventsTable} from "./StyledEventsTable.tsx";
import EventDataRow from "../EventRow/EventDataRow.tsx";
import ButtonAddEvent from "../ButtonAddEvent/ButtonAddEvent.tsx";
import EventHeadRow from "../EventRow/EventHeadRow.tsx";
import {EventsDataContext} from "../../context/EventsDataContext.tsx";

const EventsTable = () => {
  const {eventsData} = useContext(EventsDataContext);

    return (
      <div style={{position: "relative"}}>
        <StyledEventsTable>
          <EventHeadRow/>
          {eventsData.map((eventData, idx) => <EventDataRow key={idx} data={eventData}/>)}
        </StyledEventsTable>
        <ButtonAddEvent/>
      </div>
    );
  }
;

export default EventsTable;