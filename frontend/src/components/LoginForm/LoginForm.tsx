import React from 'react';
import {
  StyledRememberPasswordBlock,
  StyledCheckbox,
  StyledFieldsWrapper, StyledFormButton,
  StyledLink,
  StyledLoginForm, StyledRegisterBlock
} from "./StyledLoginform.tsx";
import FormField from "../FormField/FormField.tsx";
import loginIcon from "../../assets/login_icon.svg"
import emailIcon from "../../assets/email_icon.svg"
import lockIcon from "../../assets/lock_icon.svg"

const LoginForm = () => {
  return (
    <StyledLoginForm>
      <h1>
        Вход
      </h1>
      <StyledFieldsWrapper>
        <FormField icon={loginIcon} id='username' type='text' placeholder="Логин"/>
        <FormField icon={emailIcon} id='email' type='email' placeholder="Почта"/>
        <FormField icon={lockIcon} id='password' type='password' placeholder="Пароль"/>
      </StyledFieldsWrapper>
      <StyledRememberPasswordBlock>
        <div>
          <StyledCheckbox type='checkbox'/>
          <p>Запомнить</p>
        </div>
        <StyledLink to='/about'>Забыли пароль?</StyledLink>
      </StyledRememberPasswordBlock>
      <StyledFormButton>Войти</StyledFormButton>
      <StyledRegisterBlock>
        <p>Нет аккаунта?</p>
        <StyledLink to='/register'>Зарегистрируйтесь</StyledLink>
      </StyledRegisterBlock>
    </StyledLoginForm>
  );
};

export default LoginForm;