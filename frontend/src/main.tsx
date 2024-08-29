import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Category, Home, Tests, Transaction, Report } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/transaction/add",
        element: <Transaction defaultValue="create" />,
      },
      {
        path: "/transaction",
        element: <Transaction defaultValue="see" />,
      },
      {
        path: "/category/add",
        element: <Category defaultValue="create" />,
      },
      {
        path: "/category",
        element: <Category defaultValue="see" />,
      },
      {
        path: "/report",
        element: <Report />,
      },
      {
        path: "/tes",
        element: <Tests />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
