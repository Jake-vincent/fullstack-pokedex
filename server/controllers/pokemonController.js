import Pokemon from '../models/pokemonModel.js';

const getPokemon = async (request, response) => {
  try {
    const requestUrl = request.url;
    if(requestUrl.length === 1) {
      const pokemons = await Pokemon.find();
      response.status(200).send({
        message: 'List of all Pokemons',
        count: pokemons.length,
        data: {
         pokemons: pokemons
        }
      });
    } else {
      const { limit, offset } = request.query;
      const limitValue = parseInt(limit) || Pokemon.length
      const offsetValue = parseInt(offset) || 0;
      const filteredPokemon = await Pokemon.find().limit(limitValue).skip(offsetValue);

      return response.status(200).send({
        message: `Pokemons: limit ${limitValue} and offset ${offsetValue}`,
        count: filteredPokemon.length,
        data : {
          pokemon: filteredPokemon
        }
      });
    } 
  } catch (error) {
      console.error(error);
      response.send({message: error.message});
  }
};

const getPokemonName = async (request, response) => {
  try {
    const { name } = request.params;
    const pokemon = await Pokemon.find({ name: { $regex: name, $options: 'i' }}).exec();
   
      if (pokemon) {
        response.status(200).send({
          message: `Pokemon: ${name}.`,
          data : {
            pokemon: pokemon
          }
        });
      } else {
        return response.status(404).send({
          message: `Pokemon ${name} is not found.`
        });
      }

  } catch (error) {
      console.error(error);
      return response.send({message: error.message});
  }
};

const getQueryPokemon = async (request, response) => {
  try {
    const { name, type } = request.query;
    
    if (name && !type) {
      const filteredPokemon = await Pokemon.find({name: { $regex: name, $options: 'i' }}).exec();
      
      return response.status(200).send({
       message: `Pokemon: ${name}.`,
        data: {
          pokemon: filteredPokemon
        }
      });
    } else if (type && !name) {
      const filteredPokemon = await Pokemon.find({type:{ $regex: type, $options: 'i' }}).exec();
      
      return response.status(200).send({
        message: `Pokemon Type: ${type}.`,
        count: filteredPokemon.length,
        data : {
          pokemon: filteredPokemon
        }
      }); 
    } else if (name && type) {
      const filteredPokemon = await Pokemon.find({name: { $regex: name, $options: 'i' }}).find({type:{ $regex: type, $options: 'i' }}).exec();
      
      return response.status(200).send({
        message: `Pokemon Type: ${type}.`,
        count: filteredPokemon.length,
        data : {
          pokemon: filteredPokemon
        }
      }); 
    } else {
      return response.status(404).send({
        message: `Pokemon is not found.`
      });
    }
  } catch (error) {
      console.error(error);
      return response.send({message: error.message});
  }
};
  
const addPokemon = async ( req, res) => {
  try {
    const {  name, img, type, stats, damages, misc} = req.body;
    const pokemonExist = await Pokemon.findOne({ name });
   
    if (pokemonExist) {
      res.status(400).send({
        message: 'Pokemon already exists.',
      });
    } else {
      const newPokemon = new Pokemon({
        name, img, type, stats, damages, misc});
  
      await newPokemon.save();
  
      res.status(201).send({
        message: 'New Pokemon Added',
        data: newPokemon,
      });
    }
  } catch (error) {
      console.error(error);
      res.send(error.message);
  }
};

const updatePokemon = async ( req, res) => {
  try {
    const { id } = req.params;
    const { name, img, type, stats, damages, misc } = req.body;

    let pokemon = await Pokemon.updateOne({ _id: id }, {
      $set: {
        name: name, 
        img: img, 
        type: type, 
        stats: stats,
        damages: damages, 
        misc: misc
      }
    })

    res.status(201).send({
      message: 'Pokemon entry updated',
      data: pokemon,
    });

  } catch (error) {
      console.error(error);
      res.send(error.message);
  }
};

const deletePokemon = async ( req, res) => {
  try {
    const { id } = req.params;

    let pokemon = await Pokemon.deleteOne({ _id: id });

    res.status(200).send({
      message: 'Pokemon entry deleted',
      data: pokemon,
    });

  } catch (error) {
      console.error(error);
      res.send(error.message);
  }
};

export { 
  getPokemon, 
  getPokemonName, 
  getQueryPokemon,
  addPokemon,
  updatePokemon,
  deletePokemon
 };