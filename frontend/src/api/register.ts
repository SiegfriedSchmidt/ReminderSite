import {api} from "./api.ts";


export default async function register(data: { username: string, password: string, email: string, code: string }) {
  return await api.post("/auth/register", data)
}