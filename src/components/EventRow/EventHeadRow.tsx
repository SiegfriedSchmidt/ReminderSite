import React from 'react';
import {StyledEventRow} from "../EventsTable/StyledEventRow.tsx";
import {StyledEventCell} from "../EventsTable/StyledEventCell.tsx";
import ascendingIcon from "../../assets/ascending.svg";
import {StyledEventHeadContainer} from "../EventsTable/StyledEventHeadContainer.tsx";

const EventHeadRow = () => {
  return (
    <StyledEventHeadContainer>
      <StyledEventRow>
        <StyledEventCell>Название<img src={ascendingIcon} alt="sort"/></StyledEventCell>
        <StyledEventCell>Дата<img src={ascendingIcon} alt="sort"/></StyledEventCell>
        <StyledEventCell>До<img src={ascendingIcon} alt="sort"/></StyledEventCell>
      </StyledEventRow>
    </StyledEventHeadContainer>
  );
};

export default EventHeadRow;