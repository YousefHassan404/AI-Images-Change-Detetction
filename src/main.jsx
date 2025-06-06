import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import { Toaster } from "react-hot-toast";
import "./index.css";


import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";


const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>

        <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
  </StrictMode>
);
