import { getAllPokemon, getPokemon } from "./services/pokemon";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Card from "./components/Card";
import NavBar from "./components/Navbar";
import Modal from "./components/Modal";
import ModalLogged from "./components/ModalLogged";
import axios from "axios";
import CardNotFavorite from "./components/CardNotFavorite";
import PokeInfo from "./components/ModalPokeInfoCard";
//import Card2 from './components/Card'
/*
// aqui é fora do return
const [isToggled, setToggled] = useState(false);
  
const toggleTrueFalse = () => setToggled(!isToggled);

const fullEmpty = () => isToggled ? <img src = {require('./full.svg').default} height = {50} width = {50}/> 
: 
<img src = {require('./empty.svg').default} height = {50} width = {50} />

// aqui é dento do return
<button onClick={toggleTrueFalse}>
        <h3>{fullEmpty()}</h3>
</button>

{isCardVisible ? (
    <Modal onClose={ () =>setIsCardVisible(false)}>
      <h1>oihw</h1>
    </Modal> 
  ) : null}

*/

// card 2 = modal card

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
  };

  const [isModalVisible, setIsModalVisible] = useState();
  //const [isCardVisible, setIsCardVisible] = useState();

  const [username, setUsername] = useState("");

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const createUser = () => {
    axios
      .post(`https://pokedex20201.herokuapp.com/users`, { username })
      .then(({ data }) => {
        const newUserId = data.id;
        saveUserInfo(newUserId, username);
      })
      .catch(() => alert("failed to create user. Please, try again later"));
  };

  const handleLoginSubmit = () => {
    setIsModalVisible(false);
    axios
      .get(`https://pokedex20201.herokuapp.com/users/${username}`)
      .then(({ data }) => {
        const userID = data.user.id;
        saveUserInfo(userID, username);
      })
      .catch(() => {
        const userAnswer = window.confirm(
          `User not found. Would you like to create ${username}?`
        );
        if (userAnswer) createUser();
      });
  };

  const saveUserInfo = (id, username) => {
    localStorage.setItem("userID", id);
    localStorage.setItem("username", username);
    setLoggedUsername(getUserLogged());
  };

  const getUserLogged = () => localStorage.getItem("username");

  //const [login, isLoggedIn] = useState(false);

  /*const logged = () => isLoggedIn(!login)

  const showModal = () => login ? 
  <div className="App">
  
  <button onClick={()=> setIsModalVisible(true)} >Login</button>
  {isModalVisible ? (
    <Modal onClose={ () =>setIsModalVisible(false)}>
      <h2>Bem-Vindo, Treinador Pokémon! Digite o seu nome:</h2>
      <div> 
      <input type="text" id="username" placeholder="username"/>
        <button>funciona?</button>
      </div>
    </Modal> 
  ) : null}


</div>
  : 
  null
  
  /*const showCard = () => isCardVisible ? <div className = "App">
    {isCardVisible ? (
    <Modal onClose={ () =>setIsCardVisible(false)}>
      <h1>oneoie</h1>
    </Modal> 
  ) : null}
  </div> 
  : 
  null*/

  // esse é o código do modal que funciona só para o raticate
  /*{isModalVisible === "pokemon-details" ? (
                    <Modal onClose={() => setIsModalVisible(false)}>
                      <div>
                        <CardNotFavorite pokemon={pokemonData[i]} />
                      </div>
                    </Modal>
                  ) : null}*/

  const [loggedUsername, setLoggedUsername] = useState(false);

  useEffect(() => {
    setLoggedUsername(getUserLogged());
  }, []);

  const userLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    setLoggedUsername(null);
  };

  const [pokeInfo, setPokeInfo] = useState(null);

  const selectPokemon = (selectedPokemonData) => {
    setIsModalVisible("pokemon-details");
    console.log(selectedPokemonData);
    setPokeInfo(selectedPokemonData)
    console.log(pokeInfo);
  };

  /*com relação ao pokemon modal, criei outro componente só pra ele, criei usestate com array mas 
  não funcionou, setpokeinfo não adiciona pokedata[i] ao pokeinfo, ao final da execução
  pokeinfo é uma array vazia, olhar linhas 249 e 271*/

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <NavBar />

          <div className="App">
            {loggedUsername ? (
              <div>
                <span>Boas vindas {localStorage.getItem("username")}</span>
                <button onClick={userLogout}>Logout</button>
              </div>
            ) : (
              <button onClick={() => setIsModalVisible("login")}>Login</button>
            )}
            {isModalVisible === "login" ? (
              <Modal onClose={() => setIsModalVisible(false)}>
                <h2>Bem-Vindo, Treinador Pokémon! Digite o seu nome:</h2>
                <div>
                  <input
                    onChange={handleInputChange}
                    value={username}
                    type="text"
                    id="username"
                    placeholder="username"
                  />
                  <button onClick={handleLoginSubmit}>Login</button>
                </div>
              </Modal>
            ) : null}
          </div>

          <div className="btn">
            <button onClick={prev}>Previous Page</button>
            <button onClick={next}>Next Page</button>
          </div>

          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return (
                <div className="grid-container-son" key={pokemonData[i].id}>
                  {loggedUsername ? (
                    <div onClick={() => selectPokemon(pokemonData[i])}>
                      <Card pokemon={pokemon} />
                    </div>
                  ) : (
                    <div onClick={() => selectPokemon(pokemonData[i])}>
                      <CardNotFavorite pokemon={pokemon} />
                    </div>
                  )}

                  {isModalVisible === "pokemon-details" ? (
                    <Modal onClose={() => setIsModalVisible(false)}>
                      <div>
                      <PokeInfo pokeInfo={pokeInfo}/>
                      </div>
                    </Modal>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="btn">
            <button onClick={prev}>Previous Page</button>
            <button onClick={next}>Next Page</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
