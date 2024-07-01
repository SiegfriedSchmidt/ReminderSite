import {api} from "./api.ts";

export default async function login(data: { username: string, password: string }) {
  return await api.post("/auth/login", data)
}