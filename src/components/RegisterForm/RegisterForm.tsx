import React from 'react';
import {
  StyledCheckbox,
  StyledFieldsWrapper, StyledFormButton,
  StyledLink, StyledLoginForm, StyledRegisterBlock,
  StyledRememberPasswordBlock
} from "../LoginForm/StyledLoginform.tsx";
import FormField from "../FormField/FormField.tsx";
import loginIcon from "../../assets/login_icon.svg";
import emailIcon from "../../assets/email_icon.svg";
import lockIcon from "../../assets/lock_icon.svg";
import {StyledRegisterFieldsWrapper, StyledRegisterFormButton} from "./StyledRegisterForm.tsx";

const RegisterForm = () => {
  return (
    <StyledLoginForm>
      <h1>
        Регистрация
      </h1>
      <StyledRegisterFieldsWrapper>
        <FormField icon={emailIcon} id='email' type='email' placeholder="Почта"/>
        <FormField icon={lockIcon} id='password' type='password' placeholder="Пароль"/>
        <FormField icon={lockIcon} id='repeat-password' type='password' placeholder="Повтор пароля"/>
      </StyledRegisterFieldsWrapper>
      <StyledRegisterFormButton>Зарегистрироваться</StyledRegisterFormButton>
      <StyledRegisterBlock>
        <p>Уже есть аккаунт?</p>
        <StyledLink to='/login'>Войдите</StyledLink>
      </StyledRegisterBlock>
    </StyledLoginForm>
  );
};

export default RegisterForm;