import { Suspense } from "react"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { storeReducer, storeRouter } from "./store"

const App = () => (
  <Suspense fallback={<div>Cargando</div>}>
    <Provider store={storeReducer}>
      <RouterProvider router={storeRouter} />
    </Provider>
  </Suspense>
)

export default App
