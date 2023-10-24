import { createBrowserRouter } from "react-router-dom"
import Private from "../components/layout/Private"
import { NotFound, PrivateRouter } from "../views"

const storeRouter = createBrowserRouter([
  { path: "/", element: <Private />, children: PrivateRouter },
  { path: "*", element: <NotFound /> },
])

export default storeRouter
