import EventData from "../types/EventData.ts";
import {SortColumnType} from "../types/SortColumnType.ts";

export default function sortEventsData(data: EventData[], sorting: SortColumnType) {
  const direction = (sorting.direction === 'desc' ? -1 : 1) * (sorting.column === 'date' ? -1 : 1);
  data.sort((lhs, rhs) => {
    if (lhs[sorting.column] < rhs[sorting.column]) {
      return direction;
    } else if (lhs[sorting.column] > rhs[sorting.column]) {
      return -direction;
    }
    return 0;
  });
}