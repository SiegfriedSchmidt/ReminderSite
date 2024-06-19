import {createContext, FC, ReactNode, useState} from "react";
import User from "../types/User.ts";


interface UserContextProps {
  user: User | null,
  setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {
  }
});

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContextProvider: FC<UserContextProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}