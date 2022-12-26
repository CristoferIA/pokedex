import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderPoke from "../components/HeaderPoke";
import "../../public/css/pokeInfo.css";
import "../../public/css/pokeCard.css";

const PokedexInfo = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <article>
      <HeaderPoke />
      <div className="pokeInfo">
        <section className="pokeInfo__basic">
          <div className={`pokeInfo__color bg-${pokemon?.types[0].type.name}`}>
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
          <div className="pokeInfo__container">
            <h3 className={`color-${pokemon?.types[0].type.name}`}>#{pokemon?.id}</h3>
            <h1 className={`color-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h1>
            <ul>
              <li>
                <p>Weight</p> <p>{pokemon?.weight}</p>
              </li>
              <li>
                <p>Height</p> <p>{pokemon?.height}</p>
              </li>
            </ul>

            <div className="pokeInfo__description">
              <div>
                <h3>Type</h3>
                <div className="pokeInfo__type">
                  {pokemon?.types.map((type) => (
                    <div className={`bg-${type.type.name}`} key={type.type.name}>{type.type.name}</div>
                  ))}
                </div>
              </div>
              <div>
                <h3>Abilities</h3>
                <div className="pokeInfo__abilities">
                  {pokemon?.abilities.map((ability) => (
                    <div key={ability.ability.name}>{ability.ability.name}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pokeInfo__stats">
              <h3>Stats</h3>
              <ul>
                {pokemon?.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    <div className="pokeInfo__level-stats">
                      <p>{stat.stat.name}:</p> <p>{stat.base_stat}/150</p>
                    </div>
                    <div className="pokeInfo__level">
                      <div style={{width: `${(stat.base_stat*100)/150}%`}}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pokeInfo__movements">
          <div className="movements">
            <h1>Movements</h1>
            <div>
              {pokemon?.moves.map((move) => (
                <div key={move.move.name}>{move.move.name}</div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default PokedexInfo;
