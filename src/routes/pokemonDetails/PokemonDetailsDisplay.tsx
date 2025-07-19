import type {PokemonDetailsAPIResponse} from "../../types/pokemon";
import {useNavigate} from "react-router";

export default function PokemonDetailsDisplay({pokemon, name}: { pokemon: PokemonDetailsAPIResponse, name: string }) {
    const navigate = useNavigate()
    return (
        <div className="card card-side bg-base-100 shadow-sm border border-accent m-4 w-1/2 mx-auto">
            <figure className="p-4">
                <img
                    className="w-40 h-40 object-contain"
                    src={pokemon.sprites.front_default}
                    alt={`Image of ${name}`}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title capitalize">{name}</h2>

                <div>
                    <p className="font-semibold">Types:</p>
                    <div className="flex gap-2 flex-wrap">
                        {pokemon.types.map(({type}) => (
                            <span key={type.name} className="badge badge-info">{type.name}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-semibold mt-2">Abilities:</p>
                    <ul className="list-disc list-inside">
                        {pokemon.abilities.map(({ability}) => (
                            <li key={ability.name}>{ability.name}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="font-semibold mt-2">Base Stats:</p>
                    <ul className="list-inside">
                        {pokemon.stats.map(({stat, base_stat}) => (
                            <li key={stat.name}>
                                <strong>{stat.name}</strong>: {base_stat}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card-actions justify-end mt-4">
                    <button onClick={() => navigate(-1)} className="btn btn-outline btn-accent">Back</button>
                </div>
            </div>
        </div>
    );
}