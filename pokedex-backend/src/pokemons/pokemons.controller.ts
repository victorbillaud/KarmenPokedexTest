import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Pokemon } from 'src/pokemon';
import { Pokemons } from 'src/pokemons';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async findAll(): Promise<Pokemon[]> {
    return this.pokemonsService.findAll();
  }

  @Get('next')
  async findNext(): Promise<Pokemon[]> {
    return this.pokemonsService.nextPage();
  }

  @Get('previous')
  async findPrevious(): Promise<Pokemon[]> {
    return this.pokemonsService.previousPage();
  }
}
