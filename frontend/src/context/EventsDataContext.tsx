import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import EventData from "../types/EventData.ts";
import {SortColumnType} from "../types/SortColumnType.ts";
import getEvents from "../api/getEvents.ts";
import sortEventsData from "../utils/sortEventsData.ts";
import useUser from "../hooks/useUser.tsx";
import getDaysBetween from "../utils/getDaysBetween.ts";

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
    curSorting: {column: 'until', direction: 'desc'},
    setCurSorting: () => {
    }
  }
)

interface EventDataProviderProps {
  children: ReactNode
}

export const EventsDataProvider: FC<EventDataProviderProps> = ({children}) => {
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [curSorting, setCurSorting] = useState<SortColumnType>({column: 'until', direction: 'desc'});
  const {user} = useUser()

  useEffect(() => {
    async function getData() {
      const rs = await getEvents()
      if (rs.status !== 'success') {
        return
      }

      const todayDate = new Date();
      const events: EventData[] = rs.content.map(({id, title, date, description}) => {
        const date1 = new Date(date)
        return {id: id.toString(), title, date: date1, description, until: getDaysBetween(todayDate, date1)}
      })
      sortEventsData(events, curSorting)
      setEventsData(events)
    }

    getData()
  }, [user]);

  useEffect(() => {
    sortEventsData(eventsData, curSorting)
    setEventsData([...eventsData])
  }, [curSorting]);

  function setOneEvent(event: EventData, idx: number) {
    eventsData[idx] = event
    sortEventsData(eventsData, curSorting)
    setEventsData([...eventsData])
  }

  function getOneEvent(idx: number): EventData | undefined {
    if (idx >= 0 && idx < eventsData.length) {
      return eventsData[idx]
    } else if (idx === eventsData.length) {
      return {title: '', description: '', date: new Date(), until: 0, id: ''}
    }

    return undefined
  }

  return (
    <EventsDataContext.Provider value={{eventsData, curSorting, setCurSorting, setOneEvent, getOneEvent}}>
      {children}
    </EventsDataContext.Provider>
  );
};
