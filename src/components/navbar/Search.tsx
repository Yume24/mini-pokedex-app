import {type ChangeEvent, type FormEvent, useState} from "react";
import {useNavigate} from "react-router";

export default function Search() {
    const navigate = useNavigate()
    const [input, setInput] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const params = new URLSearchParams();
        params.set("search", input)
        navigate(`?${params.toString()}`);
    }

    function handleChange({target}: ChangeEvent<HTMLInputElement>) {
        setInput(target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search for Pokemon</label>
            <input onChange={handleChange} value={input} id="search" type="text" placeholder="Search for Pokemon"
                   className="input text-black"/>
            <button type="submit" className="btn btn-outline">Search</button>
        </form>
    )
}