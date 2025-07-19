import {useEffect, useState} from "react";
import type {PokemonBasic, PokemonListAPIResponse} from "../../types/pokemon";
import PokemonCard from "../../components/pokemonCard/PokemonCard.tsx";

const url = "https://pokeapi.co/api/v2/pokemon/";

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<PokemonBasic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        function parseData(data: PokemonListAPIResponse): PokemonBasic[] {
            return data.results.map((pokemon) => ({
                name: pokemon.name,
                url: pokemon.url,
            }))
        }

        async function fetchPokemon() {
            setIsLoading(true);
            setHasError(false);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = await response.json();
                setPokemonList(parseData(json));
                setIsLoading(false);

            } catch (error) {
                setHasError(true);
                setIsLoading(false);
                console.error(error);
            }
        }

        void fetchPokemon();
    }, []);

    return (
        <div className="w-9/10 m-auto flex items-center flex-wrap">
            {pokemonList.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon}/>)}
        </div>
    );
}