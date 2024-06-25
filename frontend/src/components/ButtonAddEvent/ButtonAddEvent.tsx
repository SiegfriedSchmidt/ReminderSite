import React, {useContext} from 'react';
import {StyledButtonAddEvent} from "./StyledButtonAddEvent.tsx";
import buttonAddIcon from "../../assets/button_add.svg"
import {EventsDataContext} from "../../context/EventsDataContext.tsx";

const ButtonAddEvent = () => {
  const {eventsData} = useContext(EventsDataContext);

  return (
    <StyledButtonAddEvent to={"/event/" + eventsData.length}>
      <img src={buttonAddIcon} alt="Add Event"/>
    </StyledButtonAddEvent>
  );
};

export default ButtonAddEvent;