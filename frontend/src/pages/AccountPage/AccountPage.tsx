import React, {useEffect, useState} from 'react';
import {Container, Header, SettingsContainer, StyledExitButton} from "./StyledAccountPage.tsx";
import logoAccountIcon from "../../assets/logo_account_icon.svg"
import EditFieldInput from "../../components/EditField/EditFieldInput.tsx";
import SwitchWithText from "../../components/SwitchWithText/SwitchWithText.tsx";
import AnimatedEditFieldInput from "../../components/EditField/AnimatedEditFieldInput.tsx";
import useUser from "../../hooks/useUser.tsx";
import useConfiguredToast from "../../hooks/useConfiguredToast.tsx";
import updateNotificationTime from "../../api/updateNotificationTime.ts";
import updateNotificationPush from "../../api/updateNotificationPush.ts";
import updateNotificationTelegram from "../../api/updateNotificationTelegram.ts";
import updateNotificationEmail from "../../api/updateNotificationEmail.ts";
import {
  getPushPermission,
  registerServiceWorker, subscribeNotifications,
  unregisterServiceWorker
} from "../../utils/pushNotifications.ts";

const AccountPage = () => {
  const {user, addUser, removeUser} = useUser()
  const {successToast, errorToast} = useConfiguredToast()
  const [switchEmail, setSwitchEmail] = useState<boolean>(false);


  function onClickButtonExit() {
    removeUser()
  }

  async function onInputTime(time: string) {
    if (user) {
      const rs = await updateNotificationTime(time)
      if (rs.status !== "success") {
        return errorToast("Ошибка", rs.content)
      }
      addUser({...user, notifications: {...user.notifications, time}})
      successToast('Время уведомления изменено')
    }
  }

  async function onSwitchPush(checked: boolean) {
    if (user) {
      if (checked) {
        await registerServiceWorker('./service-worker.js')
        await getPushPermission()
        await subscribeNotifications()
        successToast('Всплывающие уведомления включены')
      } else {
        await unregisterServiceWorker()
        successToast('Всплывающие уведомления выключены')
      }
      const rs = await updateNotificationPush(checked)
      if (rs.status !== "success") {
        return errorToast("Ошибка", rs.content)
      }
      addUser({...user, notifications: {...user.notifications, pushEnabled: checked}})
    }
  }

  async function onSwitchTelegram(checked: boolean) {
    if (user) {
      if (checked) {
        successToast('Уведомления по телеграму включены')
      } else {
        successToast('Уведомления по телеграму выключены')
      }
      const rs = await updateNotificationTelegram(checked)
      if (rs.status !== "success") {
        return errorToast("Ошибка", rs.content)
      }
      addUser({...user, notifications: {...user.notifications, telegramEnabled: checked}})
    }
  }

  async function onSwitchEmail(checked: boolean) {
    if (user) {
      setSwitchEmail(checked)
      if (checked) {
        successToast('Уведомления по почте включены')
      } else {
        successToast('Уведомления по почте выключены')
      }
      const rs = await updateNotificationEmail(checked)
      if (rs.status !== "success") {
        return errorToast("Ошибка", rs.content)
      }
      addUser({...user, notifications: {...user.notifications, emailEnabled: checked}})
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
          <SwitchWithText text="Всплывающие уведомления" defaultChecked={user.notifications.pushEnabled}
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