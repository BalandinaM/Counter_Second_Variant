import { useState } from 'react'
import './App.css'
import { CounterBlock } from './components/counterBlock/CounterBlock';
import { SettingsBlock } from './components/settingsBlock/SettingsBlock';

const MIN_COUNT_DEFAULT = 0;
const MAX_COUNT_DEFAULT = 5;
const INCREMENT_DEFAULT = 1;

function App() {
  const [count, setCount] = useState(() => {
    const countAsString = localStorage.getItem("counterValue");
    if (countAsString) {
      return JSON.parse(countAsString);
    }
    return MIN_COUNT_DEFAULT;
  });
  const [maxCount, setMaxCount] = useState(() => {
    const countAsString = localStorage.getItem("maxCounterValue");
    if (countAsString) {
      return JSON.parse(countAsString);
    }
    return MAX_COUNT_DEFAULT;
  })
  const [minCount, setMinCount] = useState(() => {
    const countAsString = localStorage.getItem("minCounterValue");
    if (countAsString) {
      return JSON.parse(countAsString);
    }
    return MIN_COUNT_DEFAULT;
  })
  const [newMaxCount, setNewMaxCount] = useState(maxCount);
  const [newMinCount, setNewMinCount] = useState(minCount);
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [errorMinValue, setErrorMinValue] = useState(false);
  const [errorMaxValue, setErrorMaxValue] = useState(false);

  const incCount = () => {
    setCount(count + INCREMENT_DEFAULT)
  }

  const resetCount = () => {
    setCount(minCount)
  }

  const handleSaveSettings = (minCountValue: number, maxCountValue: number) => {
    setMinCount(minCountValue)
    setMaxCount(maxCountValue)
    setCount(minCountValue)
    localStorage.setItem("counterValue", JSON.stringify(minCountValue))
    localStorage.setItem("maxCounterValue", JSON.stringify(maxCountValue))
    localStorage.setItem("minCounterValue", JSON.stringify(minCountValue))
  }

  const changeMinCountHandler = (value: number) => {
    setNewMinCount(value);
    setErrorMinValue(value >= newMaxCount || value < 0)
  };

   const changeMaxCountHandler = (value: number) => {
    setNewMaxCount(value);
    setErrorMaxValue(value <= newMinCount || value < 0)
  };

   const handleFocus = () => {
    setIsFocusInput(true)
  };

   const handleOnBlur = () => {
    setIsFocusInput(false)
  };


  return (
    <div className='wrap_counter'>
      <CounterBlock
        count={count}
        minCount={minCount}
        maxCount={maxCount}
        incCount={incCount}
        resetCount={resetCount}
        isFocusInput={isFocusInput}
        errorMaxValue={errorMaxValue}
        errorMinValue={errorMinValue}
      />
      <SettingsBlock 
        maxCount={newMaxCount}
        minCount={newMinCount}
        handleSaveSettings={handleSaveSettings}
        changeMinCountHandler={changeMinCountHandler}
        changeMaxCountHandler={changeMaxCountHandler}
        handleFocus={handleFocus}
        handleOnBlur={handleOnBlur}
        errorMinValue={errorMinValue}
        errorMaxValue={errorMaxValue}
      />
    </div>
  );
}

export default App;
