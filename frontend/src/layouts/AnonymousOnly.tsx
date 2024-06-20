import {Outlet, Navigate} from "react-router-dom"
import useUser from "../hooks/useUser"

function AnonymousOnly() {
  const {user} = useUser()

  if (!user) {
    return <Outlet/>
  }

  if (user.isAdmin) {
    return <Navigate to="/admin" replace/>
  }

  return <Navigate to="/account" replace/>
}


export default AnonymousOnly;