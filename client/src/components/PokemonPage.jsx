import { useState, useEffect } from 'react';
import PokemonList from './PokemonList';

const PokemonPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemons();
  }, [offset]);

  const loadPokemons = async () => {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/pokemons/?offset=${offset}&limit=20`,{
        method: 'GET'
      });
      const response = await result.json();
      setPokemons((prevPokemons) => [...Object.values(prevPokemons), ...Object.values(response.data)]);
    } catch (error) {
      setError(error);
    }
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  const pokemonArr = Object.values(pokemons)

  return (
    <div>
      <h1>POKEDEX</h1>
      <div className="pokemonList">
        {!pokemonArr ? null : pokemonArr.map((pokemon, index) => (
          <PokemonList key={index} pokemon={pokemon}  />
        ))}
      </div>

      <button onClick={handleLoadMore} className="btn-load-more">Load More</button>
    </div>
  );
}

export default PokemonPage;