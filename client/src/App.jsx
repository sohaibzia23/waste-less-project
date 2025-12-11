import "./App.css";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/items",
      element: <ItemsPage />,
    },
    {
      path: "error",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
