import type {PokemonDetailsAPIResponse} from "../../types/pokemon";
import {useNavigate} from "react-router";

export default function PokemonDetailsDisplay({pokemon, name}: { pokemon: PokemonDetailsAPIResponse, name: string }) {
    const navigate = useNavigate()
    return (
        <div className="card bg-base-100 shadow-xl border border-neutral m-4 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
                <figure className="p-6">
                    <img
                        className="w-40 h-40 object-contain"
                        src={pokemon.sprites.front_default}
                        alt={`Image of ${name}`}
                    />
                </figure>

                <div className="card-body w-full">
                    <h2 className="card-title capitalize text-2xl mb-4">{name}</h2>

                    <div className="mb-3">
                        <p className="font-semibold mb-1">Types:</p>
                        <div className="flex gap-2 flex-wrap">
                            {pokemon.types.map(({type}) => (
                                <span key={type.name} className="badge badge-info">{type.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-3">
                        <p className="font-semibold mb-1">Abilities:</p>
                        <ul className="list-disc list-inside">
                            {pokemon.abilities.map(({ability}) => (
                                <li key={ability.name} className="capitalize">{ability.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-3">
                        <p className="font-semibold mb-1">Base Stats:</p>
                        <ul className="list-disc list-inside">
                            {pokemon.stats.map(({stat, base_stat}) => (
                                <li key={stat.name} className="capitalize">
                                    <strong>{stat.name}</strong>: {base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card-actions justify-end mt-4">
                        <button onClick={() => navigate(-1)} className="btn btn-outline btn-neutral">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}