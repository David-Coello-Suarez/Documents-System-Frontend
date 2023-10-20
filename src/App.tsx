import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { storeRouter } from "./store";

const App = () => <Suspense fallback={<div>Cargando</div>}>
    <RouterProvider router={storeRouter} />
</Suspense>;

export default App;
