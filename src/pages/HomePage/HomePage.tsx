import React from 'react';
import {Container} from "./StyledHomePage.tsx";
import EventsTable from "../../components/EventsTable/EventsTable.tsx";
import EventData from "../../types/EventData.ts";

const stubData: EventData[] = [
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.1970"),
    until: 365,
    description: ""
  },{
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.1970"),
    until: 365,
    description: ""
  },{
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.1970"),
    until: 365,
    description: ""
  },{
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.2020"),
    until: 365,
    description: ""
  },{
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.1970"),
    until: 365,
    description: ""
  }, {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.1970"),
    until: 365,
    description: ""
  },
]

const HomePage = () => {
  return (
    <Container>
      <p>Напоминаний: <span>{stubData.length}</span></p>
      <EventsTable eventsData={stubData}/>
    </Container>
  );
};

export default HomePage;