import {Link} from "react-router";
import PokemonCard from "../../components/pokemonCard/PokemonCard.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import type {PokemonBasic} from "../../types/pokemon";

function calculatePokemonId(index: number, currentPage: number, itemsPerPage: number): number {
    return index + 1 + (currentPage - 1) * itemsPerPage;
}

export default function PokemonListDisplay({pokemonList, searchTerm, maxPage, page, pokemonPerPage}: {
    pokemonList: PokemonBasic[],
    searchTerm: string | undefined
    maxPage: number
    page: number
    pokemonPerPage: number
}) {
    return (
        <div className="my-5">
            {searchTerm && (
                <div className="mb-4 text-center">
                    <h2 className="text-xl">
                        Search results for <strong>{searchTerm}</strong>
                    </h2>
                    <Link className="btn btn-neutral btn-outline mt-2" to="/">
                        Go back
                    </Link>
                </div>
            )}
            <div className="w-11/12 mx-auto flex flex-wrap justify-center">
                {pokemonList.map((pokemon, index) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon} id={calculatePokemonId(index, page, pokemonPerPage)}/>
                ))}
            </div>
            {!searchTerm && <Pagination maxPage={maxPage}/>}
        </div>
    );
}