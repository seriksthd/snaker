import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Main from "../components/Main";
import CartPage from "../pages/CartPage";
import Favorite from "../pages/Favorite";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
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
    ],
  },
  // { path: "*", element: <NotFondPage /> },
]);
