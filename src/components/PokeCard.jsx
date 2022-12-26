import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/css/pokeCard.css";

const PokeCard = ({ url }) => {
  const [pokemon, setPokemon] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => {navigate('/notfund') });
  }, [url]);

  const hundleClick =()=>{
      navigate(`/pokedex/${pokemon.id}`)
  }

  return (
    <div onClick={hundleClick} className={`card border-${pokemon?.types[0].type.name}`}>
      <div className={`card__color bg-${pokemon?.types[0].type.name}`}></div>
      <div className="card__data">
        <img
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <h3 className={`color-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
        <ul>
          {pokemon?.types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
        <p>Tipo</p>
      </div>
      <div className="card__stats">
        <ul>
          {pokemon?.stats.map((stat) => (
            <li key={stat.stat.name}>
              {" "}
              <p>{stat.stat.name}</p> <p className={`color-${pokemon?.types[0].type.name}`}>{stat.base_stat}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokeCard;
