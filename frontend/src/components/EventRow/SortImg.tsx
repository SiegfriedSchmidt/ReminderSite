import React, {FC} from 'react';
import descendingIcon from "../../assets/descending.svg";
import ascendingIcon from "../../assets/ascending.svg";
import {SortColumnType} from "../../types/SortColumnType.ts";
import EventData from "../../types/EventData.ts";

interface SortImgProps {
  title: string;
  sortColumn: keyof EventData
  curSorting: SortColumnType
}

const SortImg: FC<SortImgProps> = ({title, curSorting, sortColumn}) => {
  return (
    <>
      <p>
        {title}
      </p>
      {
        curSorting.column === sortColumn
          ?
          <img src={curSorting.direction === 'desc' ? descendingIcon : ascendingIcon} alt="sort"/>
          : <></>
      }
    </>
  );
};

export default SortImg;