import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import EventPage from "./pages/EventPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/account" element={<AccountPage/>}/>
    <Route path="/event" element={<EventPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
  </Route>
))

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
