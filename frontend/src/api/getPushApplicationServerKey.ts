import {api} from "./api.ts";

export default async function getPushApplicationServerKey() {
  return await api.get("/userSettings/push_application_server_key")
}