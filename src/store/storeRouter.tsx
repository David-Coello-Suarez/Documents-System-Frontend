import { createBrowserRouter } from "react-router-dom"
import Private from "../components/layout/Private"
import { NotFound } from "../views"

const storeRouter = createBrowserRouter([
  { path: "/", element: <Private />, children: [] },
  { path: "*", element: <NotFound /> },
])

export default storeRouter
