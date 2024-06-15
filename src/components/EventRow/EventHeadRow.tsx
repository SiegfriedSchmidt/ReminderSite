import React, {FC} from 'react';
import {StyledEventRow} from "../EventsTable/StyledEventRow.tsx";
import {StyledEventCell} from "../EventsTable/StyledEventCell.tsx";
import {StyledEventHeadContainer} from "../EventsTable/StyledEventHeadContainer.tsx";
import {SortColumnType} from "../../types/SortColumnType.ts";
import SortImg from "./SortImg.tsx";
import EventData from "../../types/EventData.ts";

interface EventHeadRowProps {
  curSorting: SortColumnType
  sortEvents: (sorting: SortColumnType) => void
}

const EventHeadRow: FC<EventHeadRowProps> = ({curSorting, sortEvents}) => {
  function onClick(column: keyof EventData) {
    if (curSorting.column === column) {
      curSorting.direction = curSorting.direction === 'asc' ? 'desc' : 'asc';
    } else {
      curSorting.column = column
      curSorting.direction = 'desc'
    }
    sortEvents(curSorting);
  }

  return (
    <StyledEventHeadContainer>
      <StyledEventRow>
        <StyledEventCell onClick={() => onClick('title')}>
          <SortImg title='Название' sortColumn='title' curSorting={curSorting}/>
        </StyledEventCell>
        <StyledEventCell onClick={() => onClick('date')}>
          <SortImg title='Дата' sortColumn='date' curSorting={curSorting}/>
        </StyledEventCell>
        <StyledEventCell onClick={() => onClick('until')}>
          <SortImg title='До' sortColumn='until' curSorting={curSorting}/>
        </StyledEventCell>
      </StyledEventRow>
    </StyledEventHeadContainer>
  );
};

export default EventHeadRow;