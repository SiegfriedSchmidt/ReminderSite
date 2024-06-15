import React, {FC} from 'react';
import {StyledEventsTable} from "./StyledEventsTable.tsx";
import EventDataRow from "../EventRow/EventDataRow.tsx";
import ButtonAddEvent from "../ButtonAddEvent/ButtonAddEvent.tsx";
import EventHeadRow from "../EventRow/EventHeadRow.tsx";
import EventData from "../../types/EventData.ts";
import {SortColumnType} from "../../types/SortColumnType.ts";

interface EventsTableProps {
  eventsData: EventData[];
  curSorting: SortColumnType;
  sortEvents: (sorting: SortColumnType) => void
}

const EventsTable: FC<EventsTableProps> = ({eventsData, curSorting, sortEvents}) => {

    return (
      <div style={{position: "relative"}}>
        <StyledEventsTable>
          <EventHeadRow curSorting={curSorting} sortEvents={sortEvents}/>
          {eventsData.map((eventData, idx) => <EventDataRow key={idx} data={eventData}/>)}
        </StyledEventsTable>
        <ButtonAddEvent/>
      </div>
    );
  }
;

export default EventsTable;