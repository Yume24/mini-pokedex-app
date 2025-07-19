import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router";
import {RouterProvider} from "react-router/dom";
import RootLayout from "./components/rootLayout/RootLayout.tsx";
import PokemonList from "./routes/home/PokemonList.tsx";

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index={true} element={<PokemonList/>}/>
        </Route>
    ))

    return (
        <RouterProvider router={router}/>
    );
}

export default App
