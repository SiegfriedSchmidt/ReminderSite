import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import AboutPage from "./pages/AboutPage/AboutPage.tsx";
import AccountPage from "./pages/AccountPage/AccountPage.tsx";
import EventPage from "./pages/EventPage/EventPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import {EventsDataProvider} from "./context/EventsDataContext.tsx";
import {UserContextProvider} from "./context/UserContext.tsx";
import AnonymousOnly from "./layouts/AnonymousOnly.tsx";
import RequireAuth from "./layouts/RequireAuth.tsx";
import {AxiosSettings} from "./api/api.ts";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route element={<RequireAuth/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/account" element={<AccountPage/>}/>
      <Route path="/event/:idx" element={<EventPage/>}/>
    </Route>
    <Route element={<AnonymousOnly/>}>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Route>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Route>
))

function App() {
  return (
    <UserContextProvider>
      <EventsDataProvider>
        <AxiosSettings>
          <RouterProvider router={router}/>
        </AxiosSettings>
      </EventsDataProvider>
    </UserContextProvider>
  )
}

export default App
