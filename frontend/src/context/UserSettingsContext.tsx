import {createContext, FC, ReactNode, useState} from "react";
import UserSettings from "../types/UserSettings.ts";


interface UserSettingsContextProps {
  userSettings: UserSettings | null,
  setUserSettings: (userSettings: UserSettings | null) => void
}

export const UserSettingsContext = createContext<UserSettingsContextProps>({
  userSettings: null,
  setUserSettings: () => {
  }
});

interface UserSettingsContextProviderProps {
  children: ReactNode
}

export const UserSettingsContextProvider: FC<UserSettingsContextProviderProps> = ({children}) => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(() => {
    const storedUserSettings = localStorage.getItem("userSettings")
    return storedUserSettings ? JSON.parse(storedUserSettings) : null
  })

  return (
    <UserSettingsContext.Provider value={{userSettings, setUserSettings}}>
      {children}
    </UserSettingsContext.Provider>
  );
}