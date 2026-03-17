import { useState } from 'react'
import './App.css'
import { Button } from './components/button/Button';
import { Input } from './components/input/Input';

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
    <div className="wrap_counter">
      <div className="container">
        <div
          className={`${count !== maxCount ? "counter" : "counter_disabled"}`}
        >
          {!isFocusInput && <span>{count}</span>}
          {errorMaxValue || errorMinValue && <span>Error!!!!!</span>}
          {isFocusInput && !errorMinValue && !errorMaxValue && <span>enter values and press 'set'</span>}

        </div>
        <div className="wrap_button">
          <Button
            title="inc"
            disabled={count === maxCount || isFocusInput}
            callBack={incCount}
          />
          <Button
            title="reset"
            disabled={count === minCount}
            callBack={resetCount}
          />
        </div>
      </div>
      <div className="container">
        <div className="wrap_input">
          <Input
            value={newMinCount}
            valueFriend={newMaxCount}
            setNewValue={changeMinCountHandler}
            handleFocus={handleFocus}
            handleOnBlur={handleOnBlur}
            error={errorMinValue}
          />
          <Input
            value={newMaxCount}
            valueFriend={newMinCount}
            setNewValue={changeMaxCountHandler}
            handleFocus={handleFocus}
            handleOnBlur={handleOnBlur}
            error={errorMaxValue}
          />
        </div>
        <Button
          title="set"
          callBack={() => handleSaveSettings(newMinCount, newMaxCount)}
          disabled={errorMinValue || errorMaxValue}
        />
      </div>
    </div>
  );
}

export default App;
