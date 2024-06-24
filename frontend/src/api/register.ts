import {api} from "./api.ts";
import {AxiosError} from "axios";

export default async function register(data: { username: string, password: string, email: string, code: string }) {
  try {
    const rs = await api.post("auth/register", data)
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