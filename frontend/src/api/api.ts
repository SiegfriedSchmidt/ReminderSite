import axios from "axios";
import useUser from "../hooks/useUser.tsx";
import {ReactNode, useEffect, useState} from "react";

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

async function refreshToken(refreshToken: string) {
  const response = await api.post('auth/refresh', {}, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  });
  return response.data;
}

export function AxiosSettings({children}: { children: ReactNode }) {
  const {user, addUser} = useUser()
  const [setupDone, setSetupDone] = useState(false)

  useEffect(() => {
    if (user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`
    } else {
      delete api.defaults.headers.common["Authorization"]
    }
  }, [user])

  useEffect(() => {
    const JWTUpdater = api.interceptors.response.use(
      response => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response && ([401, 403, 422].includes(error.response.status)) && user && !originalRequest._retry) {
          originalRequest._retry = true
          const data = await refreshToken(user.refreshToken)

          addUser({
            ...user,
            "accessToken": data.access_token,
          })

          originalRequest.headers["Authorization"] = `Bearer ${data.access_token}`
          console.log("retrying request")
          return api(error.config)
        }

        return Promise.reject(error)
      }
    )

    setSetupDone(true)
    return () => api.interceptors.response.eject(JWTUpdater)
  }, [user])

  return setupDone ? children : null;
}


