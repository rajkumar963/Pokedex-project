import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css";
function Pokedex() {
    return (
        <div className="pokedex">
            <h1 >Pokedex</h1>
            <Search/>
            <PokemonList/>
        </div>
    )
}

export default Pokedex;