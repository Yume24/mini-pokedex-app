import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router"
import type {PokemonBasic} from "../../types/pokemon";
import {fetchPokemon} from "../../utilities/utilities.ts";
import PokemonCard from "../../components/pokemonCard/PokemonCard";
import Pagination from "../../components/pagination/Pagination";
import PokemonListLoading from "./PokemonListLoading";
import PokemonListError from "./PokemonListError";

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

        fetchPokemon(searchTerm ? null : page, searchTerm ? -1 : POKEMON_PER_PAGE)
            .then((result) => {
                const filteredList = searchTerm
                    ? result.pokemonList.filter((pokemon) =>
                        pokemon.name.startsWith(searchTerm)
                    )
                    : result.pokemonList;

                setPokemonList(filteredList);
                setMaxPage(Math.ceil(result.count / POKEMON_PER_PAGE));
                setIsLoading(false);
            })
            .catch((error) => {
                setHasError(true);
                setIsLoading(false);
                console.error(error);
            });
    }, [page, searchTerm]);

    if (isLoading) return <PokemonListLoading/>;
    if (hasError) return <PokemonListError/>;

    return (
        <>
            {searchTerm && (
                <div className="mb-4 text-center">
                    <h2>
                        Search results for <strong>{searchTerm}</strong>
                    </h2>
                    <Link className="btn mt-2" to="/">
                        Clear search
                    </Link>
                </div>
            )}
            <div className="w-11/12 mx-auto flex flex-wrap justify-center">
                {pokemonList.map((pokemon) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon}/>
                ))}
            </div>
            {!searchTerm && <Pagination maxPage={maxPage}/>}
        </>
    );
}
