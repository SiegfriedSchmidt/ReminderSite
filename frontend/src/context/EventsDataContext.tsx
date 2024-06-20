import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import EventData from "../types/EventData.ts";
import {SortColumnType} from "../types/SortColumnType.ts";
import getEvents from "../api/getEvents.ts";
import sortEventsData from "../utils/sortEventsData.ts";
import useUser from "../hooks/useUser.tsx";

interface EventsDataContextSetter {
  eventsData: EventData[]
  getOneEvent: (idx: number) => EventData | undefined
  setOneEvent: (data: EventData, idx: number) => void
  curSorting: SortColumnType
  setCurSorting: (sorting: SortColumnType) => void
}

export const EventsDataContext = createContext<EventsDataContextSetter>(
  {
    eventsData: [],
    getOneEvent: () => undefined,
    setOneEvent: () => {
    },
    curSorting: {column: 'until', direction: 'asc'},
    setCurSorting: () => {
    }
  }
)

interface EventDataProviderProps {
  children: ReactNode
}

export const EventsDataProvider: FC<EventDataProviderProps> = ({children}) => {
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [curSorting, setCurSorting] = useState<SortColumnType>({column: 'until', direction: 'asc'});

  useEffect(() => {
    async function getData() {
      const rs = await getEvents()
      if (rs.status !== 'success') {
        return
      }
      sortEventsData(rs.content, curSorting)
      setEventsData(rs.content)
    }

    getData()
  }, []);

  useEffect(() => {
    sortEventsData(eventsData, curSorting)
    setEventsData([...eventsData])
  }, [curSorting]);

  function setOneEvent(event: EventData, idx: number) {
    eventsData[idx] = event
    sortEventsData(eventsData, curSorting)
    setEventsData([...eventsData])
  }

  function getOneEvent(idx: number) {
    if (idx >= 0 || idx < eventsData.length) {
      return eventsData[idx]
    }
    return undefined
  }

  return (
    <EventsDataContext.Provider value={{eventsData, curSorting, setCurSorting, setOneEvent, getOneEvent}}>
      {children}
    </EventsDataContext.Provider>
  );
};
