import type {PokemonBasic, PokemonDetails} from "../../types/pokemon";
import {useEffect, useState} from "react";
import PokemonCardLoading from "./PokemonCardLoading.tsx";
import PokemonCardError from "./PokemonCardError.tsx";

export default function PokemonCard({pokemon}: { pokemon: PokemonBasic }) {
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        function parseData(data: PokemonDetails) {
            return data.sprites.front_default;
        }

        async function fetchPokemonImage() {
            setIsLoading(true);
            setHasError(false);
            try {
                const response = await fetch(pokemon.url);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = await response.json();
                setImageUrl(parseData(json));
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setHasError(true);
                console.error(error);
            }
        }

        void fetchPokemonImage()
    }, [pokemon.url]);

    return (
        <div className="card shadow-sm m-5 w-40 h-50 border-accent border">
            <figure>
                {isLoading ? <PokemonCardLoading/> : hasError ? <PokemonCardError/> :
                    <img className="object-cover object-center" src={imageUrl} alt={pokemon.name}/>}
            </figure>
            <div className="card-body justify-center text-center">
                <h2 className="card-title">{pokemon.name}</h2>
            </div>
        </div>
    );
}