import React, {FC, ReactNode, useEffect, useState} from 'react';
import {EventsDataContext} from "./EventsDataContext.tsx";
import getEvents from "../api/getEvents.ts";
import sortEventsData from "../utils/sortEventsData.ts";
import {SortColumnType} from "../types/SortColumnType.ts";
import EventData from "../types/EventData.ts";

interface EventDataProviderProps {
  children: ReactNode
}

const EventsDataProvider: FC<EventDataProviderProps> = ({children}) => {
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [curSorting, setCurSorting] = useState<SortColumnType>({column: 'until', direction: 'asc'});

  useEffect(() => {
    async function getData() {
      const data = await getEvents()
      sortEventsData(data, curSorting)
      setEventsData(data)
    }

    getData()
  }, []);

  useEffect(() => {
    sortEventsData(eventsData, curSorting)
    setEventsData([...eventsData])
  }, [curSorting]);

  return (
    <EventsDataContext.Provider value={{eventsData, curSorting, setCurSorting}}>
      {children}
    </EventsDataContext.Provider>
  );
};

export default EventsDataProvider;