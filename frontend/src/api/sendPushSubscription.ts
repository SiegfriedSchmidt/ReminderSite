import {api} from "./api.ts";
import {AxiosError} from "axios";

export default async function sendPushSubscription(data: { subscription: string }) {
  try {
    const rs = await api.post("/notification/push_subscription", data)
    return {
      status: "success",
      content: rs.data
    }
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      return {
        status: "error",
        content: err.response.data,
      }
    } else {
      throw err
    }
  }
}