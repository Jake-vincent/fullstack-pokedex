import '../App.css'

const PokemonList = ({ pokemon}) => {
  return (
    <div className="pokemon">
      {pokemon.map((pokemonItem) => (
      <div key={pokemonItem._id} className="pokemon-tile">
        <img src={pokemonItem.img} alt={pokemonItem.name} />
        <h3>{pokemonItem.name}</h3>
        <p>Types: {pokemonItem.type.join(', ')}</p>
      </div>
      ))}
    </div>
  );
}
export default PokemonList;