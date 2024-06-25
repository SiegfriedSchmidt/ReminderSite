import React, {useEffect, useState} from 'react';
import {Container, Header, SettingsContainer, StyledExitButton} from "./StyledAccountPage.tsx";
import logoAccountIcon from "../../assets/logo_account_icon.svg"
import EditFieldInput from "../../components/EditField/EditFieldInput.tsx";
import SwitchWithText from "../../components/SwitchWithText/SwitchWithText.tsx";
import AnimatedEditFieldInput from "../../components/EditField/AnimatedEditFieldInput.tsx";
import useUser from "../../hooks/useUser.tsx";
import useConfiguredToast from "../../hooks/useConfiguredToast.tsx";

const AccountPage = () => {
  const {user, removeUser} = useUser()
  const {successToast} = useConfiguredToast()
  const [switchEmail, setSwitchEmail] = useState<boolean>(false);


  function onClickButtonExit() {
    removeUser()
  }

  function onInputTime(time: string) {
    console.log(time)
  }

  function onSwitchPush(checked: boolean) {
    if (checked) {
      successToast('Всплывающие уведомления включены')
    } else {
      successToast('Всплывающие уведомления выключены')
    }
  }

  function onSwitchTelegram(checked: boolean) {
    if (checked) {
      successToast('Уведомления по телеграму включены')
    } else {
      successToast('Уведомления по телеграму выключены')
    }
  }

  function onSwitchEmail(checked: boolean) {
    setSwitchEmail(checked)
    if (checked) {
      successToast('Уведомления по почте включены')
    } else {
      successToast('Уведомления по почте выключены')
    }
  }

  useEffect(() => {
    if (user) {
      setSwitchEmail(!!user.notifications.email)
    }
  }, []);

  return (
    user ?
      <Container>
        <img alt='logo' src={logoAccountIcon}/>
        <h1>{user.username}</h1>
        <p>({user.email})</p>
        <Header>Настройки напоминаний</Header>
        <SettingsContainer>
          <EditFieldInput type="time" title="Время" defaultValue={user.notifications.time}
                          onBlur={(e) => onInputTime(e.target.value)}/>
          <SwitchWithText text="Всплывающие уведомления" defaultChecked={user.notifications.push}
                          onChange={(e) => onSwitchPush(e.target.checked)}/>
          <SwitchWithText text="Telegram" defaultChecked={user.notifications.telegramEnabled}
                          onChange={(e) => onSwitchTelegram(e.target.checked)}/>
          <SwitchWithText text="Почта" defaultChecked={user.notifications.emailEnabled}
                          onChange={(e) => onSwitchEmail(e.target.checked)}/>
          <AnimatedEditFieldInput show={switchEmail} disabled type="email" defaultValue={user.notifications.email}/>
          <StyledExitButton onClick={onClickButtonExit}>Выйти</StyledExitButton>
        </SettingsContainer>
      </Container>
      : <></>
  );
};

export default AccountPage;