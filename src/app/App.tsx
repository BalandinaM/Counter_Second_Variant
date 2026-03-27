import { useState } from 'react'
import './App.css'
import { CounterBlock } from '../components/counterBlock/CounterBlock';
import { SettingsBlock } from '../components/settingsBlock/SettingsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCountAC, resetCountAC, saveNewSettingsAC, setErrorMaxValueAC, setErrorMinValueAC, type CounterType } from '../model/counter-reducer';
import type { RootState } from './store';

// const MIN_COUNT_DEFAULT = 0;
// const MAX_COUNT_DEFAULT = 5;
// const INCREMENT_DEFAULT = 1;


function App() {
  // const [count, setCount] = useState(() => {
  //   const countAsString = localStorage.getItem("counterValue");
  //   if (countAsString) {
  //     return JSON.parse(countAsString);
  //   }
  //   return MIN_COUNT_DEFAULT;
  // });
  // const [maxCount, setMaxCount] = useState(() => {
  //   const countAsString = localStorage.getItem("maxCounterValue");
  //   if (countAsString) {
  //     return JSON.parse(countAsString);
  //   }
  //   return MAX_COUNT_DEFAULT;
  // })
  // const [minCount, setMinCount] = useState(() => {
  //   const countAsString = localStorage.getItem("minCounterValue");
  //   if (countAsString) {
  //     return JSON.parse(countAsString);
  //   }
  //   return MIN_COUNT_DEFAULT;
  // })
 
  // const [errorMinValue, setErrorMinValue] = useState(false);
  // const [errorMaxValue, setErrorMaxValue] = useState(false);
  const count = useSelector<RootState, CounterType['count']>(state => state.counter.count)
  const minCount = useSelector<RootState, CounterType['minCount']>(state => state.counter.minCount)
  const maxCount = useSelector<RootState, CounterType['maxCount']>(state => state.counter.maxCount)
  const errorMinValue = useSelector<RootState, CounterType['errorMinValue']>(state => state.counter.errorMinValue)
  const errorMaxValue = useSelector<RootState, CounterType['errorMaxValue']>(state => state.counter.errorMaxValue)
  const [newMaxCount, setNewMaxCount] = useState(maxCount);
  const [newMinCount, setNewMinCount] = useState(minCount);
  const [isFocusInput, setIsFocusInput] = useState(false);
  const dispatch = useDispatch()

  // const incCount = () => {
  //   if (count < maxCount) {
  //     dispatch(incrementCountAC())
  //   }
  //   // setCount(count + INCREMENT_DEFAULT)
  // }

  const incCount = () => (count < maxCount) ? dispatch(incrementCountAC()) : count
  const resetCount = () => dispatch(resetCountAC())
    // setCount(minCount)
  

  const handleSaveSettings = (newMinCount: number, newMaxCount: number) => {
    dispatch(saveNewSettingsAC({newMinCount, newMaxCount}))
    // setMinCount(minCountValue)
    // setMaxCount(maxCountValue)
    // setCount(minCountValue)
    // localStorage.setItem("counterValue", JSON.stringify(minCountValue))
    // localStorage.setItem("maxCounterValue", JSON.stringify(maxCountValue))
    // localStorage.setItem("minCounterValue", JSON.stringify(minCountValue))
  }

  const changeMinCountHandler = (value: number) => {
    setNewMinCount(value);
    if (errorMaxValue) {
      dispatch(setErrorMaxValueAC(value <= newMinCount || value < 0))
      // setErrorMaxValue(value <= newMinCount || value < 0)
    }
    dispatch(setErrorMinValueAC(value >= newMaxCount || value < 0))
  };

   const changeMaxCountHandler = (value: number) => {
    setNewMaxCount(value);
    if (errorMinValue) {
      dispatch(setErrorMinValueAC(value >= newMaxCount || value < 0))
      // setErrorMinValue(value >= newMaxCount || value < 0)
    }
    dispatch(setErrorMaxValueAC(value <= newMinCount || value < 0))
    // setErrorMaxValue(value <= newMinCount || value < 0)
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
