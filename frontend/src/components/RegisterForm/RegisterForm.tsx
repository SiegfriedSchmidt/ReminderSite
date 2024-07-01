import React, {FormEvent, useState} from 'react';
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
import useUserSettings from "../../hooks/useUserSettings.tsx";

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
  const {addUser} = useUser()
  const {addUserSettings} = useUserSettings()
  const [expirationTime, setExpirationTime] = useState<number | null>(null)
  const [userFields, setUserFields] = useState<{
    email: string,
    username: string,
    password: string,
    repeatPassword: string
  }>()

  async function onSubmit(e: FormEvent<FormElement>) {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const username = e.currentTarget.elements.username.value;
    const password = e.currentTarget.elements.password.value;
    const repeatPassword = e.currentTarget.elements.repeatPassword.value;

    if (!email || !username || !password || !repeatPassword) {
      return errorToast('Пустые поля!', `Попробуйте войти заново!`)
    }

    if (password !== repeatPassword) {
      return errorToast('Пароли не совпадают!')
    }

    onOpen()
    setUserFields({email, username, password, repeatPassword})
    const rs = await getCode({username, email})
    if (rs.status !== 'success') {
      return errorToast('Код не был отправлен!', 'Попробуйте еще раз!')
    }
    const expirationTime = rs.content.expirationTime
    setExpirationTime(expirationTime)

    infoToast(`Код отправлен на почту ${email}`, `У вас есть ${expirationTime} секунд, чтобы ввести код!`)
  }

  function onCompeleteCode(code: string) {
    async function request() {
      if (userFields) {
        const rs = await register({...userFields, code})
        if (rs.status !== 'success') {
          return errorToast(rs.content, `Попробуйте войти заново!`)
        }
        successToast('Вы успешно зарегистрировались!', `Имя ${userFields.username}`)
        addUser({...rs.content.user})
        addUserSettings({...rs.content.userSettings})
      }
    }

    onClose()
    request()
  }

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
      {expirationTime ? <ModelWindowCode isOpen={isOpen} onClose={onClose} onComplete={onCompeleteCode}
                                         expirationTime={expirationTime}/> : <></>}

    </>
  );
};

export default RegisterForm;