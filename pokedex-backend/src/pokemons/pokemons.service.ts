import { Injectable } from '@nestjs/common';
import { Pokemons } from 'src/pokemons';
import { Pokemon } from 'src/pokemon';
import axios from 'axios';

interface getPokeApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

async function getPokemonsFromPokeAPI(url?: string) {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<getPokeApiResponse>(
      url ? url : 'https://pokeapi.co/api/v2/pokemon/',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    //console.log(JSON.stringify(data, null, 4));
    //console.log('response status is: ', status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

@Injectable()
export class PokemonsService {
  private pokemons: Pokemon[];
  private lastResponse: getPokeApiResponse;

  constructor() {
    this.pokemons = [];

    getPokemonsFromPokeAPI().then((data: getPokeApiResponse) => {
      this.lastResponse = data;
      data.results.forEach((pokemon: Pokemon) => {
        axios
          .get(pokemon.url)
          .then((response) => {
            this.pokemons.push({
              name: pokemon.name,
              url: pokemon.url,
              id: response.data.id,
              weight: response.data.weight,
              height: response.data.height,
              base_experience: response.data.base_experience,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }

  create(pokemon: Pokemon): void {
    this.pokemons.push(pokemon);
  }

  findAll(): Pokemon[] {
    return this.pokemons;
  }

  nextPage(): Pokemon[] {
    getPokemonsFromPokeAPI(this.lastResponse.next).then(
      (data: getPokeApiResponse) => {
        this.lastResponse = data;
        data.results.forEach((pokemon: Pokemon) => {
          this.pokemons = [];
          axios
            .get(pokemon.url)
            .then((response) => {
              this.pokemons.push({
                name: pokemon.name,
                url: pokemon.url,
                id: response.data.id,
                weight: response.data.weight,
                height: response.data.height,
                base_experience: response.data.base_experience,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      },
    );
    return this.pokemons;
  }

  previousPage(): Pokemon[] {
    getPokemonsFromPokeAPI(this.lastResponse.previous).then(
      (data: getPokeApiResponse) => {
        this.lastResponse = data;
        data.results.forEach((pokemon: Pokemon) => {
          this.pokemons = [];
          axios
            .get(pokemon.url)
            .then((response) => {
              this.pokemons.push({
                name: pokemon.name,
                url: pokemon.url,
                id: response.data.id,
                weight: response.data.weight,
                height: response.data.height,
                base_experience: response.data.base_experience,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      },
    );
    return this.pokemons;
  }
}
