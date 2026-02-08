import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
]);

export default function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router}></RouterProvider>
    </TooltipProvider>
  );
}
