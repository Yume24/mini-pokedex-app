export type PokemonBasic = {
    name: string;
    url: string;
}

export type PokemonListAPIResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonBasic[];
}

export type PokemonDetails = {
    sprites: {
        front_default: string;
    }
}