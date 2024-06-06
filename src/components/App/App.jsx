import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import DetallePokemon from '../DetallePokemon/DetallePokemon';

const App = () => {

  const [listaPokemon, setListaPokemon] = useState([]);
  const [detallePokemon, setDetallePokemon] = useState({});
  const [paginacion, setPaginacion] = useState({ next: null, previous: null })

  useEffect(() => {
    const cargarPokemon = () => {
      axios.get("https://pokeapi.co/api/v2/pokemon")
        .then(({ data }) => {
          setListaPokemon(data.results);
          setPaginacion({ next: data.next, previous: data.previous });
        });
    }

    cargarPokemon();
  }, []);

  const cargarDetallePokemon = (url) => {
    axios.get(url)
      .then(({ data }) => {
        setDetallePokemon(data);
      });
  }

  const actualizarPagina = (url) => {
    axios.get(url)
      .then(({ data }) => {
        setListaPokemon(data.results);
        setPaginacion({ next: data.next, previous: data.previous });
      });
  }

  return (
    <>
      <h1> Poke-API with axios </h1>
      <div className='contenedor-pokemon'>
        <ul>
          {listaPokemon.map((pokemon, index) => {
            return (
              <li key={index}>
                <button onClick={() => cargarDetallePokemon(pokemon.url)}> {pokemon.name} </button>
              </li>)
          })}
        </ul>
        {(detallePokemon.name !== undefined)
          ? <DetallePokemon detallePokemon={detallePokemon} /> :
          <div className="info">
            Select a Pokemon
          </div>}
      </div>
      {(paginacion.previous !== null)
        ? <button onClick={() => actualizarPagina(paginacion.previous)}> Previous page </button> : ""}
      {(paginacion.next !== null)
        ? <button onClick={() => actualizarPagina(paginacion.next)}> Next page </button> : ""}
    </>
  );
}

export default App;
