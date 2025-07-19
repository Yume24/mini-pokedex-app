import type {PokemonBasic} from "../../types/pokemon";
import {Link} from "react-router";

const imageBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function PokemonCard({pokemon, id}: { pokemon: PokemonBasic, id: number }) {
    return (
        <Link
            className="hover:scale-105 cursor-pointer transition card shadow-lg m-2 w-40 h-50 border border-neutral"
            to={`/pokemon/${pokemon.name}`}
        >
            <figure>
                <img
                    className="object-cover h-30 p-1"
                    src={`${imageBaseUrl}${id}.png`}
                    alt={`image of ${pokemon.name}`}
                />
            </figure>
            <div className="card-body py-1">
                <h2 className="card-title text-center m-auto capitalize">{pokemon.name}</h2>
            </div>
        </Link>
    );
}
