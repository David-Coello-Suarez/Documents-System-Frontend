import { createBrowserRouter } from "react-router-dom"
import { NotFound, PublicRouter } from "../views"
import { Private, Public } from "../components/layout"

const storeRouter = createBrowserRouter([
  { path: "/", element: <Public />, children: PublicRouter },
  { path: "/dash", element: <Private /> },
  { path: "*", element: <NotFound /> },
])

export default storeRouter
