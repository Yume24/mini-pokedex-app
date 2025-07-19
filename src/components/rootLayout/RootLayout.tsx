import {Outlet} from "react-router";
import Navbar from "../navbar/Navbar.tsx";

export default function RootLayout() {
    return (<>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
    </>);
}