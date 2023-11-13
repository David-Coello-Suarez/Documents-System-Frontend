import { Suspense } from "react"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { storeReducer, storeRouter } from "./store"

const App = () => (
  <>
    <ToastContainer position="bottom-right" autoClose={5000} theme="colored" />
    <Suspense fallback={<div>Cargando</div>}>
      <Provider store={storeReducer}>
        <RouterProvider router={storeRouter} />
      </Provider>
    </Suspense>
  </>
)

export default App
