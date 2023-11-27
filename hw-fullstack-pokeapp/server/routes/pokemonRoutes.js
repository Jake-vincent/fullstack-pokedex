import { Router } from 'express';
import { 
  getPokemon, 
  getPokemonName, 
  getQueryPokemon,
  addPokemon,
  updatePokemon,
  deletePokemon
 } from '../controllers/pokemonController.js';

const router = Router();

router.route('/').get(getPokemon);
router.route('/search').get(getQueryPokemon);
router.route('/:name').get(getPokemonName)
router.route('/').post(addPokemon)
router.route('/:id').put(updatePokemon);
router.route('/:id').delete(deletePokemon);

export default router;