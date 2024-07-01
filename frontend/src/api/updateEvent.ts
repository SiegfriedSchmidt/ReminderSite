import {api} from "./api.ts";

export default async function updateEvent(data: { title: string, description: string, date: string, id: string }) {
  return await api.post("/event/update", data)
}