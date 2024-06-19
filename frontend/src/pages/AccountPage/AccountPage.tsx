import React from 'react';
import {Container, Header, SettingsContainer} from "./StyledAccountPage.tsx";
import logoAccountIcon from "../../assets/logo_account_icon.svg"
import EditFieldInput from "../../components/EditField/EditFieldInput.tsx";
import SwitchWithText from "../../components/SwitchWithText/SwitchWithText.tsx";

const AccountPage = () => {
  return (
    <Container>
      <img alt='logo' src={logoAccountIcon}/>
      <h1>Bob Piterson</h1>
      <p>(google@gmail.com)</p>
      <Header>Настройки напоминаний</Header>
      <SettingsContainer>
        <EditFieldInput type="time" defaultValue="08:00:00" title="Время"/>
        <SwitchWithText text="Всплывающие уведомления"/>
        <SwitchWithText text="Telegram"/>
        <SwitchWithText text="Почта"/>
        <EditFieldInput disabled type="email" defaultValue="google@gmail.com"/>
      </SettingsContainer>
    </Container>
  );
};

export default AccountPage;