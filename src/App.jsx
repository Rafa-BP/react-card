import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [difficulty, setDifficulty] = useState({size: "Easy", number: 12})

  console.log(pokemons)

  function HandleDifChange(e) {
    setDifficulty({size: e.target.textContent, number: () => {
      switch (e.target.textContent) {
        case "Easy":
          return 12
        case "Medium":
          return 24
        case "Hard":
          return 40
      }
    }})
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
    <>
      <h1>Memory Card Game</h1>
      <h2>Select Dificulty: </h2>
      <div id="difSelector">
        <button onClick={HandleDifChange}>Easy</button>
        <button onClick={HandleDifChange}>Medium</button>
        <button onClick={HandleDifChange}>Hard</button>
      </div>

      <p>Highest Score: </p>
      <p>Current Score: </p>

      <main id={`grid-${difficulty.size}`}>
        {pokemons.length === difficulty.number 
        ? pokemons.map((pokemon) => {
          <>
            <img src={pokemon.sprite}/>
            <p>{pokemon.name}</p>
          </>
        })
        : <p>Loading</p>
        }
      </main>
    </>
  );
}

export default App;
