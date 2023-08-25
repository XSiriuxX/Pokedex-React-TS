import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./pokemons.module.css";
import { Pokemon } from "../types/types";
import LoadingScreen from "../components/loadingScreen";

import { fetchPokemons } from "../api/fetchPokemons";
import { waitFor } from "../utils/utils";

function Pokemons() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      setLoading(true);
      await waitFor(1000);
      const allPokemons = await fetchPokemons();
      console.log(allPokemons);
      setPokemons(allPokemons);
      setLoading(false);
    };
    fetchAllPokemons();
  }, []);

  if (loading || !pokemons) return <LoadingScreen />;

  //Filtros para el input
  const filteredPokemons = pokemons.slice(0, 151).filter((pok) => {
    return pok.name.toLowerCase().match(query.toLowerCase());
  });

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main>
        <nav className={styles.nav}>
          {filteredPokemons?.slice(0, 151).map((pokemon) => (
            <Link
              key={pokemon.id}
              className={styles.listItem}
              to={`/pokemons/${pokemon.name.toLowerCase()}`}
            >
              <img
                className={styles.listItemIcon}
                src={pokemon.imgSrc}
                alt={pokemon.name}
              />
              <div className={styles.listItemText}>
                <span>{pokemon.name}</span>
                <span>{pokemon.id}</span>
              </div>
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}

export default Pokemons;
