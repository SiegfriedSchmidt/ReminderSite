import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import EventEdit from "../../components/EventEdit/EventEdit.tsx";

const EventPage = () => {
  const location = useLocation();

  return (
    location?.state ? <EventEdit eventData={location.state}/> : <Navigate to={'/'}/>
  );
};

export default EventPage;