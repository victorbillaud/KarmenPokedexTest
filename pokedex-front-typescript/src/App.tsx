import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import {
  getPokemons,
  getPokemonsNextPage,
  getPokemonsPreviousPage,
} from "./lib/handler";
import { Pokemon } from "./lib/type";
import PokemonBlock from "./components/pokemonBlock";

function App() {
  const [pokemons, setpokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function fetchData() {
      setpokemons(await getPokemons());
    }
    fetchData();
  }, [pokemons]);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <PokemonBlock {...pokemon} />
        ))}
      </div>
      <div className="button-container">
        <button onClick={getPokemonsPreviousPage}>Previous</button>
        <button onClick={getPokemonsNextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
