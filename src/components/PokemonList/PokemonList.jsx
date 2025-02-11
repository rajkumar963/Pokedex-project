import { use, useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 const [pokedexurl, setPokedexurl]= useState("https://pokeapi.co/api/v2/pokemon?limit=20");

 const [nexturl, setNexturl] = useState('');
 const [prevurl, setPrevurl] = useState('');

  async function getPokemon() {
    setIsLoading(true);
    try {
      const response = await axios.get(pokedexurl); // Fetch first 20 Pokémon
      const pokemonResult = response.data.results;//we get the results of the first 20 Pokémon

      setNexturl(response.data.next);
      setPrevurl(response.data.previous);

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
  }, [pokedexurl]);

  return (
    <div className="pokemon-list">
      <h4>Pokemon List</h4>
      <div className="pokemon-grid">
        {isLoading ? (
          "Loading..."
        ) : (
          pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
        )}
      </div>
      <div className="pagination">
        <button disabled={prevurl==null} onClick={() => setPokedexurl(prevurl)}>Prev</button>
        <button disabled={nexturl==null} onClick={() => setPokedexurl(nexturl)}>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
