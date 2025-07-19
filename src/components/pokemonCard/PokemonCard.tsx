import {useEffect, useState} from "react";
import type {PokemonBasic} from "../../types/pokemon";
import PokemonCardLoading from "./PokemonCardLoading";
import PokemonCardError from "./PokemonCardError";
import {fetchPokemonImage} from "../../utilities/utilities";

export default function PokemonCard({pokemon}: { pokemon: PokemonBasic }) {
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fetchPokemonImage(pokemon.url)
            .then((result) => {
                if (!cancelled) {
                    setImageUrl(result);
                    setIsLoading(false);
                    setHasError(false);
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    setIsLoading(false);
                    setHasError(true);
                    console.error(error);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [pokemon.url]);

    return (
        <div
            className="hover:scale-105 cursor-pointer transition card shadow m-2 w-40 border border-accent"
            role="button"
            onClick={() => alert(pokemon.name)}
        >
            <figure>
                {isLoading ? (
                    <PokemonCardLoading/>
                ) : hasError ? (
                    <PokemonCardError/>
                ) : (
                    <img
                        className="object-cover h-30"
                        src={imageUrl}
                        alt={`image of ${pokemon.name}`}
                    />
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title text-center m-auto capitalize">{pokemon.name}</h2>
            </div>
        </div>
    );
}
