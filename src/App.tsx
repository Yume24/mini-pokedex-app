import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router";
import {RouterProvider} from "react-router/dom";
import RootLayout from "./components/rootLayout/RootLayout.tsx";
import PokemonList from "./routes/home/PokemonList.tsx";
import PokemonDetails from "./routes/pokemonDetails/PokemonDetails.tsx";
import ErrorPage from "./components/errorElement/ErrorPage.tsx";

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<RootLayout/>} errorElement={<ErrorPage/>}>
            <Route index={true} element={<PokemonList/>}/>
            <Route path="pokemon/:name" element={<PokemonDetails/>}/>
        </Route>
    ))

    return (
        <RouterProvider router={router}/>
    );
}

export default App
