import {api} from "./api.ts";
import {AxiosError} from "axios";

export default async function updateNotificationPush(pushEnabled: boolean) {
  try {
    const rs = await api.post("notification/push", {pushEnabled})
    return {
      status: "success",
      content: rs.data
    }
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      return {
        status: "error",
        content: err.response.data.detail,
      }
    } else {
      throw err
    }
  }
}