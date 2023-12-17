import { useEffect, useState } from 'react';
import './App.css';
import Dice from './components/Dice';
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDiceArray = [];

    for (let i = 0; i < 10; i++) {
      newDiceArray.push(generateNewDice());
    }

    return newDiceArray;
  }

  const [allDiceArray, setAllDiceArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function rollDiceArray() {
    if (!tenzies) {
      setAllDiceArray((prevAllDiceArray) => {
        return prevAllDiceArray.map((dice) => {
          return dice.isHeld
            ? { ...dice }
            : generateNewDice()
        })
      });
    } else {
      setTenzies(false);
      setAllDiceArray(allNewDice());
    }

  }

  function holdDice(id) {
    setAllDiceArray((prevAllDiceArray) => {
      return prevAllDiceArray.map(dice => {
        return dice.id === id
          ? { ...dice, isHeld: !dice.isHeld }
          : { ...dice }
      })
    })
  }

  useEffect(() => {
    const allHeld = allDiceArray.every((dice) => dice.isHeld);
    const firstDiceValue = allDiceArray[0].value;
    const allSameValue = allDiceArray.every((dice) => dice.value === firstDiceValue);

    if (allHeld && allSameValue) {
      console.log("You Won!");
      setTenzies(true);
    }

  }, [allDiceArray])

  return (
    <div className="App">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className='dice__container'>
        {allDiceArray.map((dice) => {
          return <Dice key={dice.id} value={dice.value} isHeld={dice.isHeld} id={dice.id} holdDice={holdDice} />
        })}
      </div>

      <button
        onClick={rollDiceArray}
        className="roll__btn">
        {tenzies ? "New Game" : "Roll"}
      </button>

      {
        tenzies
        &&
        <Confetti
          height={window.height}
          width={window.width}
        />
      }

    </div>
  );
}

export default App;
