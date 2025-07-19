type PokemonBasic = {
    name: string;
    url: string;
}
export type PokemonBasicWithId = PokemonBasic & { id: number }
export type PokemonListAPIResponse = {
    count: number;
    results: PokemonBasic[];
}
type PokemonType = {
    type: {
        name: string
    }
}
type PokemonStat = {
    base_stat: number
    stat: {
        name: string
    }
}
type PokemonAbility = {
    ability: {
        name: string
    }
}
export type PokemonDetailsAPIResponse = {
    abilities: PokemonAbility[]
    stats: PokemonStat[]
    types: PokemonType[]
    sprites: {
        front_default: string;
    }
}