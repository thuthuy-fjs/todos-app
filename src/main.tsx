import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyle from "./components/GlobalStyle/index.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/errors/error-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/active",
    element: <App />,
  },
  {
    path: "/completed",
    element: <App />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalStyle>
    <RouterProvider router={router} />
  </GlobalStyle>
);
