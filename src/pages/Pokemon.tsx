import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./pokemon.module.css";
import PokeballImg from "../assets/pokeball.png";
import Footer from "../components/Footer";
import { PokemonDetails } from "../types/types";
import { fetchPokemon } from "../api/fetchpokemon";
import LoadingScreen from "../components/loadingScreen";
import { waitFor } from "../utils/utils";

function Pokemon() {
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPokemon() {
      setLoading(true);
      await waitFor(400);
      const fetchedPokemon = await fetchPokemon(name as string);
      setPokemon(fetchedPokemon);
      setLoading(false);
    }
    getPokemon();
  }, [name]);

  if (loading || !pokemon) return <LoadingScreen />;

  return (
    <>
      <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
        <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball" />
        Go Back
      </button>
      <div className={styles.pokemon}>
        <main className={styles.pokemonInfo}>
          <div className={styles.pokemonTitle}>
            {pokemon?.name?.toUpperCase()}
          </div>
          <div>Nr. {pokemon?.id}</div>
          <div>
            <img
              className={styles.pokemonInfoImg}
              src={pokemon?.imgSrc}
              alt={pokemon?.name}
            />
          </div>
          <div>HP: {pokemon?.hp}</div>
          <div>Attack: {pokemon?.attack}</div>
          <div>Defense: {pokemon?.defense}</div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Pokemon;
