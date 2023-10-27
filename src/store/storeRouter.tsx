import { createBrowserRouter } from "react-router-dom"
import { Public, Private } from "@/components/layout"
import { NotFound, PrivateRouter, PublicRouter } from "../views"

const storeRouter = createBrowserRouter([
  { path: "/", element: <Public />, children: PublicRouter },
  { path: "/dash", element: <Private />, children: PrivateRouter },
  { path: "*", element: <NotFound /> },
])

export default storeRouter
