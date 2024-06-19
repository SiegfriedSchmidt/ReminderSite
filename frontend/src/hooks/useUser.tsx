import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import User from "../types/User.ts";

function useUser() {
  const {user, setUser} = useContext(UserContext);

  function addUser(user: User) {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  function removeUser(user: User) {
    setUser(null)
    sessionStorage.removeItem("user")
  }

  return {user, addUser, removeUser};
}