import {api} from "./api.ts";


export default async function getCode(data: { username: string, email: string }) {
  return await api.post("/auth/getcode", data)
}