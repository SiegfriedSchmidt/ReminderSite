import React, {useEffect, useState} from 'react';
import {Container} from "./StyledHomePage.tsx";
import EventsTable from "../../components/EventsTable/EventsTable.tsx";
import EventData from "../../types/EventData.ts";
import getEvents from "../../api/getEvents.ts";
import sortEventsData from "../../utils/sortEventsData.ts";


const HomePage = () => {
  const [eventsData, setEventData] = useState<EventData[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await getEvents()
      setEventData(data)
    }

    getData()
  }, []);

  function sortEvents(column: keyof EventData) {
    sortEventsData(eventsData, column)
    setEventData([...eventsData])
  }

  return (
    <Container>
      <p>Напоминаний: <span>{eventsData.length}</span></p>
      <EventsTable sortEvents={sortEvents} eventsData={eventsData}/>
    </Container>
  );
};

export default HomePage;