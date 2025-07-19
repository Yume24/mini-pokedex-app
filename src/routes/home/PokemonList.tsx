import {useEffect, useState} from "react";
import type {PokemonBasic} from "../../types/pokemon";
import PokemonCard from "../../components/pokemonCard/PokemonCard.tsx";
import {Link, useSearchParams} from "react-router";
import Pagination from "../../components/pagination/Pagination.tsx";
import PokemonListLoading from "./PokemonListLoading.tsx";
import PokemonListError from "./PokemonListError.tsx";
import {fetchPokemon} from "./utilities.ts";

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<PokemonBasic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [pagesMaxNumber, setPagesMaxNumber] = useState(1);
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page") || 1);
    const searchTerm = searchParams.get("search");
    const pokemonPerPage = 20;

    useEffect(() => {
        if (searchTerm) {
            fetchPokemon(null, -1).then((result) => {
                setPokemonList(result.pokemonList.filter(pokemon => pokemon.name.startsWith(searchTerm)))
                setIsLoading(false);
                setHasError(false);
            }).catch(error => {
                setHasError(true);
                setIsLoading(false);
                console.error(error);
            })
        } else {
            fetchPokemon(page, pokemonPerPage).then((result) => {
                setPokemonList(result.pokemonList)
                setIsLoading(false);
                setHasError(false);
                setPagesMaxNumber(result.count)
            }).catch((error) => {
                setHasError(true);
                setIsLoading(false);
                console.error(error);
            })
        }
    }, [page, searchTerm]);

    if (isLoading) {
        return <PokemonListLoading/>
    } else if (hasError) {
        return <PokemonListError/>
    } else {
        return (
            <>
                {searchTerm ? (<><h2>Search results for "{searchTerm}"</h2>
                    <Link className="btn" to="/">Go back</Link></>) : null}
                <div className="w-9/10 m-auto flex items-center flex-wrap">
                    {pokemonList.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon}/>)}
                </div>
                {!searchTerm ? <Pagination maxPage={pagesMaxNumber}/> : null}
            </>
        );
    }
}