import React, {FC, InputHTMLAttributes} from 'react';
import {StyledToggleSwitch} from "./StyledToggleSwitch.tsx";

interface ToggleSwitchProps extends InputHTMLAttributes<HTMLInputElement> {

}


const ToggleSwitch: FC<ToggleSwitchProps> = ({...props}) => {
  return (
    <StyledToggleSwitch>
      <input {...props} type='checkbox'/>
      <span/>
    </StyledToggleSwitch>
  );
};

export default ToggleSwitch;