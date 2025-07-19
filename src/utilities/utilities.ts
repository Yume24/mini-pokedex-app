import type {PokemonBasic, PokemonDetails, PokemonListAPIResponse,} from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export function constructUrl(page: number | null, limit: number): string {
    if (limit === -1) return `${API_URL}?limit=10000`; // fetch all
    const offset = page && page > 0 ? (page - 1) * limit : 0;
    return `${API_URL}?limit=${limit}&offset=${offset}`;
}

function parsePokemonList(data: PokemonListAPIResponse): {
    pokemonList: PokemonBasic[];
    count: number;
} {
    return {
        pokemonList: data.results.map(({name, url}) => ({name, url})),
        count: data.count,
    };
}

export async function fetchPokemon(
    page: number | null,
    limit: number
): Promise<{ pokemonList: PokemonBasic[]; count: number }> {
    const res = await fetch(constructUrl(page, limit));
    if (!res.ok) throw new Error(res.statusText);
    const json = (await res.json()) as PokemonListAPIResponse;
    return parsePokemonList(json);
}

export async function fetchPokemonImage(url: string): Promise<string> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const json = (await res.json()) as PokemonDetails;
    return json.sprites.front_default;
}
