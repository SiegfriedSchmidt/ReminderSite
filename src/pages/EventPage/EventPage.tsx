import React from 'react';
import {useParams} from "react-router-dom";

const EventPage = () => {
  const {id} = useParams();

  return (
    <div>
      <h1>Event {id}</h1>
    </div>
  );
};

export default EventPage;