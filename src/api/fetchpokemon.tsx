//https://pokeapi.co/api/v2/pokemon/ditto

import { PokemonDetails } from "../types/types";
import { formatName } from "../utils/utils";

export async function fetchPokemon(name: string): Promise<PokemonDetails> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${formatName(name)}`
  );

  if (!res.ok) {
    throw new Error(`Error fetching ${name}`);
  }

  const result = await res.json();

  const pokemon = {
    name: result.name,
    id: result.id,
    imgSrc: result.sprites.front_default,
    hp: result.stats[0].base_stat,
    attack: result.stats[1].base_stat,
    defense: result.stats[2].base_stat,
  };
  return pokemon;
}
