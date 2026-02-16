import "./App.css";
import { useEffect, useState } from "react";
import {arrayToShuffled} from 'array-shuffle';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokes, setSelectedPokes] = useState([])

  const [difficulty, setDifficulty] = useState({size: "Easy", number: 12})
  const [score, setScore] = useState([0, 0])

  function HandleDifChange(e) {
    setDifficulty({size: e.target.textContent, number: (e.target.textContent === "Easy") ? 12 : (e.target.textContent === "Medium") ? 24 : 40})
    setScore([0, score[1]])
  };

  function HandlePokeClick(e) {
    if (selectedPokes.includes(e.target.alt)) {
      setScore([0, (score[0] > score[1]) ? score[0] : score[1]])
      setSelectedPokes([])
    } else {
      setScore([score[0] + 1, score[1]])
      setSelectedPokes([...selectedPokes, e.target.alt])
    }
  };

  useEffect(() => {
    async function fetchData() {
      let arr = [];
      for (let i = 1; i <= difficulty.number; i++) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          let test = await response.json();
          let obj = {}

          obj.name = test.name;
          obj.sprite = test.sprites.front_default;
          obj.selected = false;

          arr.push(obj)
        } catch (e) {
          console.log(e);
        }
      }
      setPokemons([...arr]);
    }

    fetchData();
  }, [difficulty]);

  return (
    <div id="container">
      <div id="row">
        <h1>Memory Card Game</h1>
        <h2>Select Dificulty: </h2>
        <div id="difSelector">
          <button className="btn" onClick={HandleDifChange}>Easy</button>
          <button className="btn" onClick={HandleDifChange}>Medium</button>
          <button className="btn"onClick={HandleDifChange}>Hard</button>
        </div>

        <p>Highest Score: {score[1]}</p>
        <p>Current Score: {score[0]}</p>
      </div>


      <main className="test" id={`grid-${difficulty.size}`}>
        {pokemons.length == difficulty.number
          ? arrayToShuffled(pokemons).map(pokemon => 
          <div className="poke" key={pokemon.name}>
            <img src={pokemon.sprite} alt={pokemon.name} onClick={HandlePokeClick}/>
            <p id="pokeName">{pokemon.name.toUpperCase()}</p>
          </div>
          )
        : <p>Loading</p>
        }
       
      </main>
    </div>
  );
}

export default App;
