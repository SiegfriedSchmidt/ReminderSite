import React from 'react';
import {StyledButtonAddEvent} from "./StyledButtonAddEvent.tsx";
import buttonAddIcon from "../../assets/button_add.svg"

const ButtonAddEvent = () => {
  return (
    <StyledButtonAddEvent to="/event">
      <img src={buttonAddIcon} alt="Add Event"/>
    </StyledButtonAddEvent>
  );
};

export default ButtonAddEvent;