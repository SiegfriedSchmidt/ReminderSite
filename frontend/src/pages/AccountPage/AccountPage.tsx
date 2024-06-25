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
          <EditFieldInput type="time" onChange={() => {
          }} defaultValue={user.notifications.time} title="Время"/>
          <SwitchWithText text="Всплывающие уведомления" onChange={() => {
          }} defaultChecked={user.notifications.push}/>
          <SwitchWithText text="Telegram" defaultChecked={user.notifications.telegram}
                          onChange={(e) => e.target.checked
                            ?
                            successToast('Телеграм включен', 'Мы включили телеграм бота для вас')
                            : null}
          />
          <SwitchWithText checked={switchEmail} onChange={(e) => setSwitchEmail(e.target.checked)} text="Почта"/>
          <AnimatedEditFieldInput show={switchEmail} disabled type="email" defaultValue={user.notifications.email}/>
          <StyledExitButton onClick={onClickButtonExit}>Выйти</StyledExitButton>
        </SettingsContainer>
      </Container>
      : <></>
  );
};

export default AccountPage;