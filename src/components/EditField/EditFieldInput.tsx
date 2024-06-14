import React, {FC, InputHTMLAttributes} from 'react';
import {Container, StyledEditInput} from "./StyledEditInput.tsx";
import editIcon from "../../assets/edit_icon.svg"

interface EditFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
}

const EditFieldInput: FC<EditFieldProps> = ({title, ...props}) => {
  return (
    <Container>
      <h1>{title}</h1>
      <img src={editIcon} alt="edit icon"></img>
      <StyledEditInput {...props}/>
    </Container>
  );
};

export default EditFieldInput;