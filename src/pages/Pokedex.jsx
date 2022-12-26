import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderPoke from "../components/HeaderPoke";
import "../../public/css/pokedex.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import PokeCard from "../components/PokeCard";
import Pagination from "../components/Pagination";

const Pokedex = () => {
  const user = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const [pokemon, setPokemon] = useState();
  const [typeSelect, setTypeSelect] = useState("All pokemon");
  const [types, setTypes] = useState();
  const [namePokemon, setNamePokemon] = useState();
  let poke_res = null;

  useEffect(() => {
    if(!namePokemon){
      if (typeSelect !== "All pokemon") {
        axios
          .get(typeSelect)
          .then((res) => {
            setPokemon(res.data.pokemon.map((e) => e.pokemon));
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000")
          .then((res) => {
            setPokemon(res.data.results);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [typeSelect]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => {
        setTypes(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setTypeSelect(e.target.value);
  };

  useEffect(() => {
    const div = document.querySelector(".pokedex__header");
    const span = document.querySelector(".span_name");
    
    window.addEventListener("scroll", () => {

        if (window.scrollY > 130) {
          div.classList.add('pokedex__header-2')
          span.style.color = 'black'
        }else{
          div.classList.remove('pokedex__header-2')
          span.style.color = 'red'
        }
    });
}, []);

  const submit = (data) => {
    if (data.input) {
      setNamePokemon(`https://pokeapi.co/api/v2/pokemon/${data.input.toLowerCase()}/`);
    } else {
      setNamePokemon(null);
    }
  };
  const [initiaPoke, setInitiaPoke] = useState()
  const [finaPoke, setFinaPoke] = useState()

  if (namePokemon) {
    poke_res = (
     <>
        <PokeCard key={pokemon.url} url={namePokemon} />
    </>
    );
    
  } else {
    poke_res = (
      <>
        {pokemon?.slice(initiaPoke, finaPoke+1).map((pokemon) => (
          <PokeCard key={pokemon.url} url={pokemon.url} />
        ))}
      </>
    );
  }
  return (
    <div className="pokedex">
      <HeaderPoke />
      <div className="pokedex__container">
        <header className="pokedex__header hola11">
          <h3>
            <span className="span_name">Welcome {user}</span>, here you can find your favorite pokemon
          </h3>
          <form className="pokedex__filter" onSubmit={handleSubmit(submit)}>
            <div className="pokedex__search">
              <input
                placeholder="Search a pokemon"
                type="text"
                name="input"
                {...register("input")}
              />
              <button>{'Search'}</button>
            </div>
            <select onChange={handleChange}>
              <option value="All pokemon">All pokemon</option>
              {types?.map((type) => (
                <option key={type.url} value={type.url}>
                  {type.name}
                </option>
              ))}
            </select>
          </form>
        </header>
        <section className="pokedex__pagination">
          <Pagination pokemon={pokemon} setInitiaPoke={setInitiaPoke} setFinaPoke={setFinaPoke}/>
        </section>
        <section className="pokedex__section">
         {poke_res}
        </section>        
      </div>
      <br />
      <br />
    </div>
  );
};

export default Pokedex;
