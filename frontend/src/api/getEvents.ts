import {api} from "./api.ts";

interface EventServerData {
  id: number
  title: string
  description: string
  date: string
  user: number
}

export default async function getEvents(): Promise<{ status: string, content: EventServerData[] }> {
  return await api.get("/event/getall")
}

