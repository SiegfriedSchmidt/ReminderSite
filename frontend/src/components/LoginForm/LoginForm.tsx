import React, {FormEvent} from 'react';
import {
  StyledRememberPasswordBlock,
  StyledCheckbox,
  StyledFieldsWrapper, StyledFormButton,
  StyledLink,
  StyledLoginForm, StyledRegisterBlock
} from "./StyledLoginform.tsx";
import FormField from "../FormField/FormField.tsx";
import loginIcon from "../../assets/login_icon.svg"
import lockIcon from "../../assets/lock_icon.svg"
import login from "../../api/login.ts";
import {ChakraProvider, useToast} from "@chakra-ui/react";
import useUser from "../../hooks/useUser.tsx";
import {useNavigate} from "react-router-dom";
import useConfiguredToast from "../../hooks/useConfiguredToast.tsx";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const LoginForm = () => {
  const {successToast, errorToast} = useConfiguredToast()
  const {addUser, user} = useUser()

  async function onSubmit(e: FormEvent<FormElement>) {
    e.preventDefault();
    const username = e.currentTarget.elements.username.value;
    const password = e.currentTarget.elements.password.value;
    const data = await login({username, password})

    if (!username || !password) {
      return errorToast('Пустые поля!', `Попробуйте войти заново!`)
    }

    if (data.status !== 'success') {
      return errorToast('Неверное имя или пароль!', `Попробуйте войти заново!`)
    }

    successToast('Вы успешно вошли в аккаунт!', `Имя ${username}`)

    const {accessToken, refreshToken, email, isAdmin} = data.content
    addUser({
      username,
      isAdmin,
      accessToken,
      refreshToken,
      email,
      notifications: {telegram: true, email, push: false, time: '08:00'}
    })
  }

  return (
    <StyledLoginForm onSubmit={onSubmit}>
      <h1>
        Вход
      </h1>
      <StyledFieldsWrapper>
        <FormField icon={loginIcon} id='username' type='text' placeholder="Логин"/>
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