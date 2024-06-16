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

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/account" element={<AccountPage/>}/>
    <Route path="/event/:idx" element={<EventPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Route>
))

function App() {
  return (
    <EventsDataProvider>
      <RouterProvider router={router}/>
    </EventsDataProvider>
  )
}

export default App
