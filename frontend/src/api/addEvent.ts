import {api} from "./api.ts";

export default async function addEvent(data: { title: string, description: string, date: string }) {
  return await api.post("/event/add", data)
}