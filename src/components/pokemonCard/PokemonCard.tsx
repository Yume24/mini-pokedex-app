import type {PokemonBasic, PokemonDetails} from "../../types/pokemon";
import {useEffect, useState} from "react";

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

        fetchPokemonImage()
    }, []);
    return (
        <div className="card shadow-sm m-5 w-30">
            <figure>
                <img src={imageUrl} alt={pokemon.name}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title text-center">{pokemon.name}</h2>
            </div>
        </div>
    );
}