import { Schema, model } from "mongoose";

const pokemonSchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true
  },
  img: {
    type: String,
  },
  type: {
    type: [String]
  },
  stats: {
    hp: String,
    attack: String,
    defense: String,
    spattack: String,
    spdefense: String,
    speed: String,
  },
  damages: {
    normal: String,
    fire: String,
    water: String,
    electric: String,
    grass: String,
    ice: String,
    fight: String,
    poison: String,
    ground: String,
    flying: String,
    psychic: String,
    bug: String,
    rock: String,
    ghost: String,
    dragon: String,
    steel: String,
  },
  misc: {
    classification: String,
    height: String,
    weight: String,
    happiness: String,
    },
});

const Pokemon = model("Pokemon", pokemonSchema);

export default Pokemon;