import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {constructUrlPokemonDetails, fetchPokemonDetails} from "../../utilities/utilities.ts";
import type {PokemonDetailsAPIResponse} from "../../types/pokemon";
import PokemonDetailsDisplay from "./PokemonDetailsDisplay.tsx";
import PokemonDetailsLoading from "./PokemonDetailsLoading.tsx";
import PokemonDetailsError from "./PokemonDetailsError.tsx";

export default function PokemonDetails() {
    const params = useParams();
    const pokemonName = params.name;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsAPIResponse>();
    useEffect(() => {
        let cancelled = false
        if (pokemonName) {
            fetchPokemonDetails(constructUrlPokemonDetails(pokemonName)).then((result) => {
                if (!cancelled) {
                    setPokemonDetails(result);
                    setIsLoading(false);
                    setHasError(false)
                }
            }).catch((error) => {
                if (!cancelled) {
                    setHasError(true);
                    setIsLoading(false)
                    console.error(error);
                }
            })
        }
        return () => {
            cancelled = true;
        }
    }, [pokemonName]);
    if (isLoading) return <PokemonDetailsLoading/>
    if (hasError) return <PokemonDetailsError/>
    return pokemonDetails && pokemonName && <PokemonDetailsDisplay pokemon={pokemonDetails} name={pokemonName}/>
}