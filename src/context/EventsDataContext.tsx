import {createContext} from 'react';
import EventData from "../types/EventData.ts";
import {SortColumnType} from "../types/SortColumnType.ts";

interface EventsDataContextSetter {
  eventsData: EventData[]
  curSorting: SortColumnType
  setCurSorting: (sorting: SortColumnType) => void
}

export const EventsDataContext = createContext<EventsDataContextSetter>(
  {
    eventsData: [],
    curSorting: {column: 'until', direction: 'asc'},
    setCurSorting: () => {
    }
  }
)