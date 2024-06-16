import React, {useContext} from 'react';
import {Container} from "./StyledHomePage.tsx";
import {EventsDataContext} from "../../context/EventsDataContext.tsx";
import EventsTable from "../../components/EventsTable/EventsTable.tsx";


const HomePage = () => {
  const {eventsData} = useContext(EventsDataContext);

  return (
    <Container>
      <p>Напоминаний: <span>{eventsData.length}</span></p>
      <EventsTable/>
    </Container>
  );
};

export default HomePage;