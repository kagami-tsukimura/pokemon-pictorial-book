import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import { Card } from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import { Button } from './components/button/Button';

function App() {
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextPokemonUrl, setNextPokemonUrl] = useState('');
  const [prevPokemonUrl, setPrevPokemonUrl] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialUrl);
      loadPokemon(res.results);
      setNextPokemonUrl(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrevPage = async () => {
    if (!prevPokemonUrl) return;
    await getPage(prevPokemonUrl);
  };
  const handleNextPage = async () => {
    await getPage(nextPokemonUrl);
  };

  const getPage = async (url) => {
    setLoading(true);
    let data = await getAllPokemon(url);
    await loadPokemon(data.results);
    setPrevPokemonUrl(data.previous);
    setNextPokemonUrl(data.next);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className='App'>
        <Button
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
        {loading ? (
          <h1>Now Loading...</h1>
        ) : (
          <>
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <Button
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
