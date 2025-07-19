import Search from "./Search.tsx";
import {Link} from "react-router";

export default function Navbar() {
    return (<nav className="navbar bg-primary text-primary-content">
        <div className="sm:navbar-start">
            <Link to="/">
                <img className="hidden sm:block w-50 lg:w-100" src="/navbar_icon.png" alt="Mini Pokedex App"/>
            </Link>
        </div>
        <div className="sm:navbar-center"></div>
        <div className="sm:navbar-end w-full">
            <Search/>
        </div>
    </nav>)
}