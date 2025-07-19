import type {PokemonBasicWithId} from "../../types/pokemon";
import {Link} from "react-router";
import {pathToFallbackImage} from "../../utilities/utilities.ts";
import type React from "react";

const imageBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

function handleError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    img.src = pathToFallbackImage;
}

export default function PokemonCard({pokemon}: { pokemon: PokemonBasicWithId }) {
    return (
        <Link
            className="hover:scale-105 cursor-pointer transition card shadow-lg m-2 w-40 h-50 border border-neutral"
            to={`/pokemon/${pokemon.name}`}
        >
            <figure>
                <img
                    className="object-cover h-30 p-1"
                    src={`${imageBaseUrl}${pokemon.id}.png`}
                    alt={`image of ${pokemon.name}`}
                    onError={handleError}
                />
            </figure>
            <div className="card-body py-1">
                <h2 className="card-title text-center m-auto capitalize">{pokemon.name}</h2>
            </div>
        </Link>
    );
}
