import React, {FC, useState} from 'react';
import {StyledEventRow} from "../EventsTable/StyledEventRow.tsx";
import {StyledEventCell} from "../EventsTable/StyledEventCell.tsx";
import ascendingIcon from "../../assets/ascending.svg";
import descendingIcon from "../../assets/descending.svg";
import {StyledEventHeadContainer} from "../EventsTable/StyledEventHeadContainer.tsx";
import EventData from "../../types/EventData.ts";

interface EventHeadRowProps {
  sortEvents: (column: keyof EventData) => void
}

const EventHeadRow: FC<EventHeadRowProps> = ({sortEvents}) => {
  const [sortColumn, setSortColumn] = useState<keyof EventData>('title');

  function onClick(column: keyof EventData) {
    sortEvents(column);
    setSortColumn(column);
  }

  return (
    <StyledEventHeadContainer>
      <StyledEventRow>
        <StyledEventCell onClick={() => onClick('title')}>
          Название<img src={sortColumn === 'title' ? descendingIcon : ascendingIcon} alt="sort"/>
        </StyledEventCell>
        <StyledEventCell onClick={() => onClick('date')}>
          Дата<img src={sortColumn === 'date' ? descendingIcon : ascendingIcon} alt="sort"/>
        </StyledEventCell>
        <StyledEventCell onClick={() => onClick('until')}>
          До<img src={sortColumn === 'until' ? descendingIcon : ascendingIcon} alt="sort"/>
        </StyledEventCell>
      </StyledEventRow>
    </StyledEventHeadContainer>
  );
};

export default EventHeadRow;