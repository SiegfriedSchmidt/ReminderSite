import React, {FC, ForwardedRef, InputHTMLAttributes} from 'react';
import {Container, StyledEditTextarea} from "./StyledEditInput.tsx";

interface EditFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  refInput: ForwardedRef<HTMLTextAreaElement>
  title: string
}

const EditFieldTextarea: FC<EditFieldProps> = ({refInput, title, ...props}) => {
  return (
    <Container>
      <h1>{title}</h1>
      <StyledEditTextarea ref={refInput} {...props} />
    </Container>
  );
};

export default EditFieldTextarea;