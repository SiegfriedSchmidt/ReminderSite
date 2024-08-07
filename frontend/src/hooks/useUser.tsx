import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import User from "../types/User.ts";

export default function useUser() {
  const {user, setUser} = useContext(UserContext);

  function addUser(user: User) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function removeUser() {
    setUser(null)
    localStorage.removeItem("user")
  }

  return {user, addUser, removeUser};
}