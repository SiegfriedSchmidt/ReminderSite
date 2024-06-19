import React from 'react';
import {StyledToggleSwitch} from "./StyledToggleSwitch.tsx";

const ToggleSwitch = () => {
  return (
    <StyledToggleSwitch>
      <input type='checkbox'/>
      <span/>
    </StyledToggleSwitch>
  );
};

export default ToggleSwitch;