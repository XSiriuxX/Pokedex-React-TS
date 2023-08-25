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
    <div className={styles.pokemon}>
      <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
        <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball" />
        Go Back
      </button>
      <div className={styles.pokemonDetailContainer}>
        <main className={styles.pokemonInfo}>
          <div className={styles.pokemonTitle}>
            {pokemon?.name?.toUpperCase()}
          </div>
          <div className={styles.pokemonNumber}>Nr. {pokemon?.id}</div>
          <div className={styles.pokemonImageContainer}>
            <img
              className={styles.pokemonInfoImg}
              src={pokemon?.imgSrc}
              alt={pokemon?.name}
            />
          </div>
          <div className={styles.pokemonStat}>HP: {pokemon?.hp}</div>
          <div className={styles.pokemonStat}>Attack: {pokemon?.attack}</div>
          <div className={styles.pokemonStat}>Defense: {pokemon?.defense}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Pokemon;
