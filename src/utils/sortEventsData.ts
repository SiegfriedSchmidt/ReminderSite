import EventData from "../types/EventData.ts";

export default function sortEventsData(data: EventData[], column: keyof EventData) {
  data.sort((lhs, rhs) => {
    if (lhs[column] < rhs[column]) {
      return -1;
    } else if (lhs[column] > rhs[column]) {
      return 1;
    }
    return 0;
  });
}