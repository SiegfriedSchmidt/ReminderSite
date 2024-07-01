import axios, {AxiosError, AxiosRequestConfig} from "axios";
import useUser from "../hooks/useUser.tsx";
import {ReactNode, useEffect, useState} from "react";

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

export const api = {
  get: async (url: string, config?: AxiosRequestConfig<any> | undefined): Promise<{
    status: 'success' | 'warning' | 'error',
    content: any
  }> => {
    try {
      const rs = await axiosInstance.get(url, config)
      if (rs.data.status === 'success' || rs.data.status === 'warning' || rs.data.status === 'error') {
        return {status: rs.data.status, content: rs.data.content}
      } else {
        return {status: "error", content: 'Неизвестная ошибка'}
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        return {
          status: "error",
          content: err.response.data.detail,
        }
      } else {
        throw err
      }
    }
  },
  post: async (url: string, data?: object, config?: AxiosRequestConfig<any> | undefined): Promise<{
    status: 'success' | 'warning' | 'error',
    content: any
  }> => {
    try {
      const rs = await axiosInstance.post(url, data, config)
      if (rs.data.status === 'success' || rs.data.status === 'warning' || rs.data.status === 'error') {
        return {status: rs.data.status, content: rs.data.content}
      } else {
        return {status: "error", content: 'Неизвестная ошибка'}
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        console.log(err.response)
        return {
          status: "error",
          content: err.response.statusText,
        }
      } else {
        throw err
      }
    }
  }
}

async function refreshToken(refreshToken: string) {
  const response = await api.post('auth/refresh', {}, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  });
  return response.content;
}

export function AxiosSettings({children}: { children: ReactNode }) {
  const {user, addUser} = useUser()
  const [setupDone, setSetupDone] = useState(false)

  useEffect(() => {
    if (user) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${user.accessToken}`
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"]
    }
  }, [user])

  useEffect(() => {
    const JWTUpdater = axiosInstance.interceptors.response.use(
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
          return axiosInstance(error.config)
        }

        return Promise.reject(error)
      }
    )

    setSetupDone(true)
    return () => axiosInstance.interceptors.response.eject(JWTUpdater)
  }, [user])

  return setupDone ? children : null;
}


