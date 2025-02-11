import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 const PKEDEX_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

  async function getPokemon() {
    try {
      const response = await axios.get(PKEDEX_URL); // Fetch first 20 Pokémon
      const pokemonResult = response.data.results;//we get the results of the first 20 Pokémon

      //fetch the details of each Pokémon
      const pokemonDetails = await Promise.all(
        pokemonResult.map((pokemon) => axios.get(pokemon.url))
      );

      //iterate over the results and format the data
      const formattedData = pokemonDetails.map((pokedata) => {
        const pokemon = pokedata.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_default,
          types: pokemon.types.map((type) => type.type.name),
        };
      });

      setPokemonList(formattedData);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="pokemon-list">
      <h4>Pokemon List</h4>
      {isLoading ? (
        "Loading..."
      ) : (
        pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
      )}
    </div>
  );
}

export default PokemonList;
