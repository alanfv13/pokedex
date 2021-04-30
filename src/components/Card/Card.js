import React, { useState } from "react";
import "./style.css";
import pokemonType from "./../../helpers/pokemonTypes";
import "./empty.svg";
import "./full.svg";

/*<div className = "Card__types">
                {pokemon.types.map(type => {
                    return (
                        <div className = "Card__type" style = {{ backgroundColor: pokemonType[type.type.name]}}>
                            {type.type.name}
                        </div>
                    )
                })}
            </div>

            <div className = "Card__info">
                <div className = "Card__data Card__data--weight">
                    <p className = "title">Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className = "Card__data Card__data--height">
                    <p className = "title">Height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className = "Card__data Card__data--ability">
                    <p className = "title">Ability</p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>  */

function Card({ pokemon }) {
  const [isToggled, setToggled] = useState(false);

  const toggleTrueFalse = () => setToggled(!isToggled);

  const fullEmpty = () =>
    isToggled ? (
      <img src={require("./full.svg").default} height={25} width={25} />
    ) : (
      <img src={require("./empty.svg").default} height={25} width={25} />
    );

  return (
    <div className="Card">
      <div className="Card__favButton">
        <button onClick={toggleTrueFalse}>
          <h3>{fullEmpty()}</h3>
        </button>
      </div>

      <div className="Card__img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>

      <div className="Card__name">{pokemon.name}</div>

      <div className="Card__types">
        {pokemon.types.map((type) => {
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
          <p>{pokemon.weight}</p>
        </div>
        <div className="Card__data Card__data--height">
          <p className="title">Height</p>
          <p>{pokemon.height}</p>
        </div>
        <div className="Card__data Card__data--ability">
          <p className="title">Ability</p>
          <p>{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
