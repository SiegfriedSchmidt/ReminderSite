import {api} from "./api.ts";

interface updateUserSettingsParams {
  timeNotification?: string
  pushEnabled?: boolean,
  pushSubscription?: string,
  emailEnabled?: boolean
  telegramEnabled?: boolean
}

export default async function updateUserSettings(params: updateUserSettingsParams) {
  return await api.post("/userSettings/update", params)
}