import type {PokemonBasic, PokemonListAPIResponse} from "../../types/pokemon";

const url = "https://pokeapi.co/api/v2/pokemon";

export function constructUrl(page: number | null, pokemonPerPage: number) {
    if (pokemonPerPage === -1) {
        return `${url}?limit=${pokemonPerPage}`
    }
    if (page) {
        const offset = (page - 1) * pokemonPerPage;
        return `${url}?limit=${pokemonPerPage}&offset=${offset}`
    } else {
        return `${url}?limit=${pokemonPerPage};`
    }
}

function parseData(data: PokemonListAPIResponse): { pokemonList: PokemonBasic[], count: number } {
    return {
        pokemonList: data.results.map((pokemon) => ({
            name: pokemon.name,
            url: pokemon.url,
        })),
        count: data.count,
    }
}

export async function fetchPokemon(page: number | null, pokemonPerPage: number) {
    const response = await fetch(constructUrl(page, pokemonPerPage));
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const json = (await response.json()) as PokemonListAPIResponse;
    return parseData(json);
}