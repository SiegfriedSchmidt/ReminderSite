import React, {FormEvent, useEffect, useState} from 'react';
import {StyledLink, StyledLoginForm, StyledRegisterBlock} from "../LoginForm/StyledLoginform.tsx";
import FormField from "../FormField/FormField.tsx";
import loginIcon from "../../assets/login_icon.svg";
import emailIcon from "../../assets/email_icon.svg";
import lockIcon from "../../assets/lock_icon.svg";
import {StyledRegisterFieldsWrapper, StyledRegisterFormButton} from "./StyledRegisterForm.tsx";
import {useDisclosure} from '@chakra-ui/react';
import useUser from "../../hooks/useUser.tsx";
import register from "../../api/register.ts";
import ModelWindowCode from "../ModelWindowCode/ModelWindowCode.tsx";
import getCode from "../../api/getCode.ts";
import useConfiguredToast from "../../hooks/useConfiguredToast.tsx";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  username: HTMLInputElement
  password: HTMLInputElement
  repeatPassword: HTMLInputElement
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const RegisterForm = () => {
  const {successToast, errorToast, infoToast} = useConfiguredToast()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {addUser, user} = useUser()
  const [code, setCode] = useState<string>()
  const [userFields, setUserFields] = useState<{
    email: string,
    username: string,
    password: string,
    repeatPassword: string
  }>()

  function onSubmit(e: FormEvent<FormElement>) {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const username = e.currentTarget.elements.username.value;
    const password = e.currentTarget.elements.password.value;
    const repeatPassword = e.currentTarget.elements.repeatPassword.value;

    if (password !== repeatPassword) {
      return errorToast('Пароли не совпадают!')
    }

    onOpen()
    setUserFields({email, username, password, repeatPassword})
    getCode({username, email})

    return infoToast(`Код отправлен на почту ${email}`, 'У вас есть 10 секунд, чтобы ввести код!')
  }

  useEffect(() => {
    async function request() {
      if (userFields && code) {
        const data = await register({...userFields, code})
        if (data.status !== 'success') {
          return errorToast(data.content.detail, `Попробуйте войти заново!`)
        }
        successToast('Вы успешно зарегистрировались!', `Имя ${userFields.username}`)
        const {accessToken, refreshToken, isAdmin} = data.content
        addUser({
          username: userFields.username,
          isAdmin,
          accessToken,
          refreshToken,
          email: userFields.email,
          notifications: {telegram: true, email: userFields.email, push: false, time: '08:00'}
        })
      }
    }

    onClose()
    request()
  }, [code])

  return (
    <>
      <StyledLoginForm onSubmit={onSubmit}>
        <h1>
          Регистрация
        </h1>
        <StyledRegisterFieldsWrapper>
          <FormField icon={emailIcon} id='email' type='email' placeholder="Почта"/>
          <FormField icon={loginIcon} id='username' type='text' placeholder="Логин"/>
          <FormField icon={lockIcon} id='password' type='password' placeholder="Пароль"/>
          <FormField icon={lockIcon} id='repeatPassword' type='password' placeholder="Повтор пароля"/>
        </StyledRegisterFieldsWrapper>
        <StyledRegisterFormButton>Зарегистрироваться</StyledRegisterFormButton>
        <StyledRegisterBlock>
          <p>Уже есть аккаунт?</p>
          <StyledLink to='/login'>Войдите</StyledLink>
        </StyledRegisterBlock>
      </StyledLoginForm>
      <ModelWindowCode isOpen={isOpen} onClose={onClose} setCode={setCode}/>
    </>
  );
};

export default RegisterForm;