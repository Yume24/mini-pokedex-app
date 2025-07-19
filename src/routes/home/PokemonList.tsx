import {useEffect, useState} from "react";
import type {PokemonBasic, PokemonListAPIResponse} from "../../types/pokemon";
import PokemonCard from "../../components/pokemonCard/PokemonCard.tsx";
import {useSearchParams} from "react-router";
import Pagination from "../../components/pagination/Pagination.tsx";
import PokemonListLoading from "./PokemonListLoading.tsx";
import PokemonListError from "./PokemonListError.tsx";


const url = "https://pokeapi.co/api/v2/pokemon";

function constructUrl(page: number | null, pokemonPerPage: number) {
    if (page) {
        const offset = (page - 1) * pokemonPerPage;
        return `${url}?limit=${pokemonPerPage}&offset=${offset}`
    } else {
        return `${url}?limit=${pokemonPerPage};`
    }
}

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<PokemonBasic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [pagesMaxNumber, setPagesMaxNumber] = useState(1);
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page") || 1);
    const pokemonPerPage = 20;

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
                const response = await fetch(constructUrl(page, pokemonPerPage));
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = (await response.json()) as PokemonListAPIResponse;
                setPokemonList(parseData(json));
                setPagesMaxNumber(Math.ceil(json.count / pokemonPerPage))
                setIsLoading(false);

            } catch (error) {
                setHasError(true);
                setIsLoading(false);
                console.error(error);
            }
        }

        void fetchPokemon();
    }, [page]);

    if (isLoading) {
        return <PokemonListLoading/>
    } else if (hasError) {
        return <PokemonListError/>
    } else {
        return (
            <>
                <div className="w-9/10 m-auto flex items-center flex-wrap">
                    {pokemonList.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon}/>)}
                </div>
                <Pagination maxPage={pagesMaxNumber}/>
            </>
        );
    }
}