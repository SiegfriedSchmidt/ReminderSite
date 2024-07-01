import React, {ChangeEvent, useEffect, useState} from 'react';
import {Container, Header, SettingsContainer, StyledExitButton} from "./StyledAccountPage.tsx";
import logoAccountIcon from "../../assets/logo_account_icon.svg"
import EditFieldInput from "../../components/EditField/EditFieldInput.tsx";
import SwitchWithText from "../../components/SwitchWithText/SwitchWithText.tsx";
import AnimatedEditFieldInput from "../../components/EditField/AnimatedEditFieldInput.tsx";
import useUser from "../../hooks/useUser.tsx";
import useConfiguredToast from "../../hooks/useConfiguredToast.tsx";
import updateUserSettings from "../../api/updateUserSettings.ts";
import {getPushPermission, registerServiceWorker, subscribeNotifications,} from "../../utils/pushNotifications.ts";
import getPushApplicationServerKey from "../../api/getPushApplicationServerKey.ts";
import useUserSettings from "../../hooks/useUserSettings.tsx";

const AccountPage = () => {
  const {user, removeUser} = useUser()
  const {userSettings, addUserSettings} = useUserSettings()
  const {successToast, warningToast, errorToast} = useConfiguredToast()
  const [switchEmail, setSwitchEmail] = useState<boolean>(false);


  function onClickButtonExit() {
    removeUser()
  }

  async function onInputTime(time: string) {
    console.log(time)
    if (userSettings) {
      const rs = await updateUserSettings({timeNotification: time})
      if (rs.status !== "success") {
        return errorToast("Ошибка", rs.content)
      }
      addUserSettings({...userSettings, timeNotification: time})
      successToast('Время уведомления изменено')
    }
  }

  async function onSwitchPush(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked
    if (userSettings) {
      if (checked) {
        try {
          let rs = await getPushApplicationServerKey()
          if (rs.status !== "success") {
            return errorToast('Ошибка получения ключа для подписки!')
          }
          const NOTIFICATION_KEY = rs.content.applicationServerKey

          await registerServiceWorker('./service-worker.js')
          await getPushPermission()
          const subscription = await subscribeNotifications(NOTIFICATION_KEY)

          rs = await updateUserSettings({pushSubscription: subscription})
          if (rs.status !== "success") {
            return errorToast('Ошибка отправки подписки на сервер!')
          }
          successToast('Всплывающие уведомления включены')
        } catch (error) {
          return errorToast(`Ошибка подписки на уведомления! ${error}`)
        }
      } else {
        successToast('Всплывающие уведомления выключены')
      }
      const rs = await updateUserSettings({pushEnabled: checked})
      if (rs.status !== "success") {
        return errorToast("Ошибка", rs.content)
      }
      addUserSettings({...userSettings, pushEnabled: checked})
    }
  }

  async function onSwitchTelegram(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked
    if (userSettings) {
      const rs = await updateUserSettings({telegramEnabled: checked})
      if (rs.status !== "success") {
        setTimeout(() => {
          e.target.checked = false
        }, 500)
        if (rs.status === "warning") {
          return warningToast(rs.content)
        }
        return errorToast("Ошибка", rs.content)
      }
      addUserSettings({...userSettings, telegramEnabled: checked})
      if (checked) {
        successToast('Уведомления по телеграму включены')
      } else {
        successToast('Уведомления по телеграму выключены')
      }
    }
  }

  async function onSwitchEmail(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked
    if (userSettings) {
      setSwitchEmail(checked)
      const rs = await updateUserSettings({emailEnabled: checked})
      if (rs.status !== "success") {
        setTimeout(() => {
          e.target.checked = false
        }, 500)
        if (rs.status === "warning") {
          return warningToast(rs.content)
        }
        return errorToast("Ошибка", rs.content)
      }
      addUserSettings({...userSettings, emailEnabled: checked})
      if (checked) {
        successToast('Уведомления по почте включены')
      } else {
        successToast('Уведомления по почте выключены')
      }
    }
  }

  useEffect(() => {
    if (userSettings) {
      setSwitchEmail(!!userSettings.emailNotification)
    }
  }, []);

  return (
    userSettings && user ?
      <Container>
        <img alt='logo' src={logoAccountIcon}/>
        <h1>{user.username}</h1>
        <p>({user.email})</p>
        <Header>Настройки напоминаний</Header>
        <SettingsContainer>
          <EditFieldInput type="time" title="Время" defaultValue={userSettings.timeNotification}
                          onBlur={(e) => onInputTime(e.target.value)}/>
          <SwitchWithText text="Всплывающие уведомления" defaultChecked={userSettings.pushEnabled}
                          onChange={(e) => onSwitchPush(e)}/>
          <SwitchWithText text="Telegram" defaultChecked={userSettings.telegramEnabled}
                          onChange={(e) => onSwitchTelegram(e)}/>
          <SwitchWithText text="Почта" defaultChecked={userSettings.emailEnabled}
                          onChange={(e) => onSwitchEmail(e)}/>
          <AnimatedEditFieldInput show={switchEmail} disabled type="email"
                                  defaultValue={userSettings.emailNotification}/>
          <StyledExitButton onClick={onClickButtonExit}>Выйти</StyledExitButton>
        </SettingsContainer>
      </Container>
      : <>User settings error</>
  );
};

export default AccountPage;