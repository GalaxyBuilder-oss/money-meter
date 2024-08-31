import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { CategoryPage, Home, Profile, ReportPage, Tests, TransactionPage } from "./pages";

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
        element: <TransactionPage defaultValue="create" />,
      },
      {
        path: "/transaction",
        element: <TransactionPage defaultValue="see" />,
      },
      {
        path: "/category/add",
        element: <CategoryPage defaultValue="create" />,
      },
      {
        path: "/category",
        element: <CategoryPage defaultValue="see" />,
      },
      {
        path: "/report",
        element: <ReportPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
