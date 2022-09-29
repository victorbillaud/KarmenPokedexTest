import React from "react";
import { Pokemon } from "../lib/type";
import "./pokemonBlock.css";

export default function PokemonBlock(props: Pokemon) {
  return (
    <div className="pokemonBlock-container">
      <div className="pokemonBLock-left">
        <h2><span>{props.id}</span> {props.name}</h2>
        <p>Weight: <strong>{props.weight}</strong></p>
        <p>Height: <strong>{props.height}</strong></p>
      </div>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
        alt={props.name}
      />
    </div>
  );
}
