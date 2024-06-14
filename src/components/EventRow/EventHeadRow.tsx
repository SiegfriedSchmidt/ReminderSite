import React, {useState} from 'react';
import {StyledEventRow} from "../EventsTable/StyledEventRow.tsx";
import {StyledEventCell} from "../EventsTable/StyledEventCell.tsx";
import ascendingIcon from "../../assets/ascending.svg";
import descendingIcon from "../../assets/descending.svg";
import {StyledEventHeadContainer} from "../EventsTable/StyledEventHeadContainer.tsx";

const EventHeadRow = () => {
  const [sortIdx, setSortIdx] = useState(0);

  return (
    <StyledEventHeadContainer>
      <StyledEventRow>
        <StyledEventCell onClick={() => setSortIdx(0)}>
          Название<img src={sortIdx === 0 ? descendingIcon : ascendingIcon} alt="sort"/>
        </StyledEventCell>
        <StyledEventCell onClick={() => setSortIdx(1)}>
          Дата<img src={sortIdx === 1 ? descendingIcon : ascendingIcon} alt="sort"/>
        </StyledEventCell>
        <StyledEventCell onClick={() => setSortIdx(2)}>
          До<img src={sortIdx === 2 ? descendingIcon : ascendingIcon} alt="sort"/>
        </StyledEventCell>
      </StyledEventRow>
    </StyledEventHeadContainer>
  );
};

export default EventHeadRow;