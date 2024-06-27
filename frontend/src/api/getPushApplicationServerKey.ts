import {api} from "./api.ts";
import {AxiosError} from "axios";

export default async function getPushApplicationServerKey() {
  try {
    const rs = await api.get("/notification/push_application_server_key")
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