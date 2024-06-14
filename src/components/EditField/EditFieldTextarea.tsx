import React, {FC, InputHTMLAttributes} from 'react';
import editIcon from "../../assets/edit_icon.svg";
import {Container, StyledEditTextarea} from "./StyledEditInput.tsx";

interface EditFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  title: string
}

const EditFieldTextarea: FC<EditFieldProps> = ({title, ...props}) => {
  return (
    <Container>
      <h1>{title}</h1>
      <StyledEditTextarea {...props} />
    </Container>
  );
};

export default EditFieldTextarea;