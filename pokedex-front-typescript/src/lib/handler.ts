import axios from "axios";
import { Pokemon } from "./type";

axios.defaults.baseURL = "http://localhost:3002";

const getPokemons = async (): Promise<Pokemon[]> => {
  const response = await axios.get<Pokemon[]>('/pokemons');
  return response.data;
};

const getPokemonsNextPage = async (): Promise<Pokemon[]> => {
  const response = await axios.get<Pokemon[]>('/pokemons/next');
  return response.data;
};

const getPokemonsPreviousPage = async (): Promise<Pokemon[]> => {
  const response = await axios.get<Pokemon[]>('pokemons/previous');
  return response.data;
};

export { getPokemons, getPokemonsNextPage, getPokemonsPreviousPage };
