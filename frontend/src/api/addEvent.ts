import {api} from "./api.ts";
import {AxiosError} from "axios";

export default async function addEvent(data: { title: string, description: string, date: string }) {
  try {
    const rs = await api.post("event/add", data)
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