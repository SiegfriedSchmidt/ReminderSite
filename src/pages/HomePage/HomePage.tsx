import React, {useEffect, useState} from 'react';
import {Container} from "./StyledHomePage.tsx";
import EventsTable from "../../components/EventsTable/EventsTable.tsx";
import EventData from "../../types/EventData.ts";
import getEvents from "../../api/getEvents.ts";
import sortEventsData from "../../utils/sortEventsData.ts";
import {SortColumnType} from "../../types/SortColumnType.ts";


const HomePage = () => {
  const [eventsData, setEventData] = useState<EventData[]>([]);
  const [curSorting, setCurSorting] = useState<SortColumnType>({column: 'until', direction: 'desc'});

  useEffect(() => {
    async function getData() {
      const data = await getEvents()
      sortEventsData(data, curSorting)
      setEventData(data)
    }

    getData()
  }, []);

  function sortEvents(sorting: SortColumnType) {
    setCurSorting({...sorting});
    sortEventsData(eventsData, sorting)
    setEventData([...eventsData])
  }

  return (
    <Container>
      <p>Напоминаний: <span>{eventsData.length}</span></p>
      <EventsTable curSorting={curSorting} sortEvents={sortEvents} eventsData={eventsData}/>
    </Container>
  );
};

export default HomePage;