import {api} from "./api.ts";

export default async function deleteEvent(eventId: string) {
  return await api.post("/event/delete", {eventId})
}