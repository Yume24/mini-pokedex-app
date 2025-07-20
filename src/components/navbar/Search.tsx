import {type ChangeEvent, type FormEvent, useState} from "react";
import {useNavigate} from "react-router";

export default function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        setInput(target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.set("search", input.trim());
        setInput("");
        navigate(`/?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mx-5">
            <label htmlFor="search" className="sr-only">
                Search for Pokémon
            </label>
            <input
                onChange={handleChange}
                value={input}
                id="search"
                type="text"
                placeholder="Search Pokémon"
                className="input input-bordered text-black"
            />
            <button type="submit" className="btn btn-outline hover:bg-white hover:border-white">
                Search
            </button>
        </form>
    );
}
