import AddUser from "./adduser/AddUser";
import User from "./getusers/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Update from "./updateuser/Update";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
