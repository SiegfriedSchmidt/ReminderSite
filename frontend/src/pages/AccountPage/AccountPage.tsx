import React, {useState} from 'react';
import {Container, Header, SettingsContainer} from "./StyledAccountPage.tsx";
import logoAccountIcon from "../../assets/logo_account_icon.svg"
import EditFieldInput from "../../components/EditField/EditFieldInput.tsx";
import SwitchWithText from "../../components/SwitchWithText/SwitchWithText.tsx";
import AnimatedEditFieldInput from "../../components/EditField/AnimatedEditFieldInput.tsx";

const AccountPage = () => {
  const [switchEmail, setSwitchEmail] = useState<boolean>(false);

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
        <SwitchWithText onChange={(e) => setSwitchEmail(e.target.checked)} text="Почта"/>
        <AnimatedEditFieldInput show={switchEmail} disabled type="email" defaultValue="google@gmail.com"/>
      </SettingsContainer>
    </Container>
  );
};

export default AccountPage;