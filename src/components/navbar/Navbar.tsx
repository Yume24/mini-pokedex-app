import Search from "./Search.tsx";

export default function Navbar() {
    return (<nav className="navbar bg-primary text-primary-content">
        <div className="navbar-start"></div>
        <div className="navbar-center">
            <img className="w-100" src="/navbar_icon.png" alt="Mini Pokedex App"/>
        </div>
        <div className="navbar-end">
            <Search/>
        </div>
    </nav>)
}