import React, {FC} from 'react';
import {StyledSwitchWithText} from "./StyledSwitchWithText.tsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.tsx";

interface SwitchWithTextProps {
  text: string;
}

const SwitchWithText: FC<SwitchWithTextProps> = ({text}) => {
  return (
    <StyledSwitchWithText>
      <h1>{text}</h1>
      <ToggleSwitch/>
    </StyledSwitchWithText>
  );
};

export default SwitchWithText;