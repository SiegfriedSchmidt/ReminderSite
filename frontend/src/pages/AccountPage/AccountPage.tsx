import React, {useState} from 'react';
import {Container, Header, SettingsContainer} from "./StyledAccountPage.tsx";
import logoAccountIcon from "../../assets/logo_account_icon.svg"
import EditFieldInput from "../../components/EditField/EditFieldInput.tsx";
import SwitchWithText from "../../components/SwitchWithText/SwitchWithText.tsx";
import AnimatedEditFieldInput from "../../components/EditField/AnimatedEditFieldInput.tsx";
import {ChakraProvider, useToast} from "@chakra-ui/react";

const AccountPage = () => {
  const toast = useToast()
  const [switchEmail, setSwitchEmail] = useState<boolean>(false);

  return (
    <ChakraProvider>
      <Container>
        <img alt='logo' src={logoAccountIcon}/>
        <h1>Bob Piterson</h1>
        <p>(google@gmail.com)</p>
        <Header>Настройки напоминаний</Header>
        <SettingsContainer>
          <EditFieldInput type="time" defaultValue="08:00:00" title="Время"/>
          <SwitchWithText text="Всплывающие уведомления"/>
          <SwitchWithText text="Telegram" onChange={(e) => e.target.checked ?
            toast({
                title: 'Телеграм включен',
                description: 'Мы включили телеграм бота для вас',
                status: 'success',
                duration: 9000,
                isClosable: true
              }
            ) : null}/>
          <SwitchWithText onChange={(e) => setSwitchEmail(e.target.checked)} text="Почта"/>
          <AnimatedEditFieldInput show={switchEmail} disabled type="email" defaultValue="google@gmail.com"/>
        </SettingsContainer>
      </Container>
    </ChakraProvider>
  );
};

export default AccountPage;