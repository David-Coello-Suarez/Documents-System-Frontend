import { createBrowserRouter } from "react-router-dom"
import Private from "../components/layout/Private"

const storeRouter = createBrowserRouter([
    { path: '/', element: <Private />, children: [] }
])

export default storeRouter