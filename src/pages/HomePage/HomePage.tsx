import React from 'react';
import {Container} from "./StyledHomePage.tsx";
import EventsTable from "../../components/EventsTable/EventsTable.tsx";

const HomePage = () => {
  return (
    <Container>
      <p>Напоминаний: <span>10</span></p>
      <EventsTable/>
    </Container>
  );
};

export default HomePage;