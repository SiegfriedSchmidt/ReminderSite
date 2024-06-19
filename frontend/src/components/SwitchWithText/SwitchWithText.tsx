import React, {FC, InputHTMLAttributes} from 'react';
import {StyledSwitchWithText} from "./StyledSwitchWithText.tsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.tsx";

interface SwitchWithTextProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const SwitchWithText: FC<SwitchWithTextProps> = ({text, ...props}) => {
  return (
    <StyledSwitchWithText>
      <h1>{text}</h1>
      <ToggleSwitch {...props}/>
    </StyledSwitchWithText>
  );
};

export default SwitchWithText;