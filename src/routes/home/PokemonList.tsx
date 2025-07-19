import {useEffect, useState} from "react";
import {useSearchParams} from "react-router"
import type {PokemonBasicWithId, PokemonListAPIResponse} from "../../types/pokemon";
import {constructUrlPokemonList, fetchPokemonList} from "../../utilities/utilities.ts";
import PokemonListLoading from "./PokemonListLoading";
import PokemonListError from "./PokemonListError";
import PokemonListDisplay from "./PokemonListDisplay.tsx";

const POKEMON_PER_PAGE = 20;

/*
* NOTE
* After pokemon no. 1026 path to the sprite gets offset therefore a correction is needed
* */
const PATH_NAME_CHANGE_ID = 1026;
const PATH_NAME_OFFSET = 8975;

function parseList(result: PokemonListAPIResponse, searchTerm: string | undefined, page: number) {
    const listWithIds: PokemonBasicWithId[] = result.results.map((pokemon, index) => {
        let id = (page - 1) * POKEMON_PER_PAGE + index + 1;
        if (id >= PATH_NAME_CHANGE_ID) id += PATH_NAME_OFFSET;
        return {
            ...pokemon,
            id,
        }
    })
    return searchTerm
        ? listWithIds.filter((pokemon) =>
            pokemon.name.startsWith(searchTerm)
        )
        : listWithIds;
}

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<PokemonBasicWithId[]>([]);
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
                setPokemonList(parseList(result, searchTerm, page));
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

    return <PokemonListDisplay pokemonList={pokemonList} searchTerm={searchTerm} maxPage={maxPage}/>
}
