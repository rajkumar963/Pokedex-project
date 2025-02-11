import axios from "axios";
import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import "./PokemonDetails.css";

function pokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  async function getPokemon() {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      console.log(response.data);
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        type: response.data.types.map((t) => t.type.name),
      });
  }

  useEffect(() => {
      getPokemon();
  }, []);

    return (
        <div className="pokemon-details">
           <div className="pokemon-names">{pokemon.name} </div>
           <img className="pokemon-img" src={pokemon.image} alt="" />
          <div className="feature">
            <div>Weight: {pokemon.weight}</div>
            <div>Height: {pokemon.height}</div>
            <div>Type: {pokemon.type}</div>
          </div>
        </div>
    );
}

export default pokemonDetails;