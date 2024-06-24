import {api} from "./api.ts";
import {AxiosError} from "axios";

export default async function getCode(data: { username: string, email: string }) {
  try {
    const rs = await api.post("getcode", data)
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