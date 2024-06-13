import React from 'react';
import {StyledButtonAddEvent} from "./StyledButtonAddEvent.tsx";
import buttonAddIcon from "../../assets/button_add.svg"

const ButtonAddEvent = () => {
  console.log(new Date('01.01.1970'))
  return (
    <StyledButtonAddEvent>
      <img src={buttonAddIcon} alt="Add Event"/>
    </StyledButtonAddEvent>
  );
};

export default ButtonAddEvent;