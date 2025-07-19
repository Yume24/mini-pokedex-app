import type {PokemonDetailsAPIResponse, PokemonListAPIResponse,} from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export function constructUrlPokemonList(page: number | null, limit: number): string {
    if (limit === -1) return `${API_URL}?limit=10000`; // fetch all
    const offset = page && page > 0 ? (page - 1) * limit : 0;
    return `${API_URL}?limit=${limit}&offset=${offset}`;
}

export function constructUrlPokemonDetails(pokemon: string) {
    return `${API_URL}/${pokemon}`;
}

export async function fetchPokemonList(url: string): Promise<PokemonListAPIResponse> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    return (await res.json()) as PokemonListAPIResponse
}

export async function fetchPokemonDetails(url: string): Promise<PokemonDetailsAPIResponse> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    return (await res.json()) as PokemonDetailsAPIResponse;
}
