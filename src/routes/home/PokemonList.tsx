import {useEffect, useState} from "react";
import {useSearchParams} from "react-router"
import type {PokemonBasic} from "../../types/pokemon";
import {constructUrlPokemonList, fetchPokemonList} from "../../utilities/utilities.ts";
import PokemonListLoading from "./PokemonListLoading";
import PokemonListError from "./PokemonListError";
import PokemonListDisplay from "./PokemonListDisplay.tsx";

const POKEMON_PER_PAGE = 20;

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<PokemonBasic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [maxPage, setMaxPage] = useState(1);

    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page") || 1);
    const searchTerm = searchParams.get("search")?.toLowerCase().trim();

    useEffect(() => {
        setIsLoading(true);
        setHasError(false);

        fetchPokemonList(constructUrlPokemonList(searchTerm ? null : page, searchTerm ? -1 : POKEMON_PER_PAGE))
            .then((result) => {
                const filteredList = searchTerm
                    ? result.results.filter((pokemon) =>
                        pokemon.name.startsWith(searchTerm)
                    )
                    : result.results;

                setPokemonList(filteredList);
                setMaxPage(Math.ceil(result.count / POKEMON_PER_PAGE));
                setIsLoading(false);
                setHasError(false);
            })
            .catch((error) => {
                setHasError(true);
                setIsLoading(false);
                console.error(error);
            });
    }, [page, searchTerm]);

    if (isLoading) return <PokemonListLoading/>;
    if (hasError) return <PokemonListError/>;

    return <PokemonListDisplay pokemonList={pokemonList} searchTerm={searchTerm} maxPage={maxPage} page={page}
                               pokemonPerPage={POKEMON_PER_PAGE}/>
}
