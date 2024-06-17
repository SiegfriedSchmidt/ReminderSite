import React from 'react';
import {Container} from "./StyledLoginPage.tsx";
import LoginForm from "../../components/LoginForm/LoginForm.tsx";

const LoginPage = () => {
  return (
    <Container>
      <LoginForm/>
    </Container>
  );
};

export default LoginPage;