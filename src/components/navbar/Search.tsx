import {type ChangeEvent, type FormEvent, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";

export default function Search() {
    const [input, setInput] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        setInput(target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        params.set("search", input.trim());
        params.set("page", "1");
        navigate(`?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
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
            <button type="submit" className="btn btn-outline">
                Search
            </button>
        </form>
    );
}
