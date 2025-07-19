import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router";
import {RouterProvider} from "react-router/dom";
import RootLayout from "./components/rootLayout/RootLayout.tsx";

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}></Route>
    ))

    return (
        <RouterProvider router={router}/>
    );
}

export default App
