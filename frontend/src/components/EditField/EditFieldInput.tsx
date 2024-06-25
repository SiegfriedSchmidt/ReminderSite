import React, {FC, ForwardedRef, InputHTMLAttributes} from 'react';
import {Container, StyledEditInput} from "./StyledEditInput.tsx";
import editIcon from "../../assets/edit_icon.svg"

interface EditFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  refInput?: ForwardedRef<HTMLInputElement>
  title?: string
}

const EditFieldInput: FC<EditFieldProps> = ({refInput, title, style, ...props}) => {
  return (
    <Container style={style}>
      {title ? <h1>{title}</h1> : <></>}
      <img src={editIcon} alt="edit icon"></img>
      <StyledEditInput ref={refInput} {...props}/>
    </Container>
  );
};

export default EditFieldInput;