import React, {FC, InputHTMLAttributes} from 'react';
import {StyledFormField} from "./StyledFormField.tsx";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement>{
  icon: string
}

const FormField: FC<FormFieldProps> = ({icon, ...props}) => {
  return (
    <StyledFormField>
      <input {...props}/>
      <img alt={props.type} src={icon}/>
    </StyledFormField>
  );
};

export default FormField;