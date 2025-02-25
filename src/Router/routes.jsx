import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../components/Main";
import CartPage from "../pages/CartPage";
import Favorite from "../pages/Favorite";
import App from "../App";
import Login from "../pages/Login";
import NotFondPage from "../pages/NotFondPage";
import Profile from "../components/Profile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      {
        children: [
          {
            path: "",
            element: <Main />,
          },
          {
            path: "favorite",
            element: <Favorite />,
          },
          {
            path: "cartPage",
            element: <CartPage />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFondPage /> },
]);
