import "./style.css";
import pokemonType from "./../../helpers/pokemonTypes";
import { useState } from "react";

function PokeInfo({ pokeInfo }) {
  return (
    <div className="Card">
      <div className="Card__img">
        <img src={pokeInfo.sprites.front_default} alt="" />
      </div>

      <div className="Card__name">{pokeInfo.name}</div>

      <div className="Card__types">
        {pokeInfo.types.map((type) => {
          return (
            <div
              key={type.type.name}
              className="Card__type"
              style={{ backgroundColor: pokemonType[type.type.name] }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>

      <div className="Card__info">
        <div className="Card__data Card__data--weight">
          <p className="title">Weight</p>
          <p>{pokeInfo.weight}</p>
        </div>
        <div className="Card__data Card__data--height">
          <p className="title">Height</p>
          <p>{pokeInfo.height}</p>
        </div>
        <div className="Card__data Card__data--ability">
          <p className="title">Ability</p>
          <p>{pokeInfo.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
}

export default PokeInfo;
