import { useState } from 'react'
import './App.css'
import { CounterBlock } from '../components/counterBlock/CounterBlock';
import { SettingsBlock } from '../components/settingsBlock/SettingsBlock';
import { incrementCountAC, resetCountAC, saveNewSettingsAC, setErrorMaxValueAC, setErrorMinValueAC, type CounterType } from '../model/counter-reducer';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectCount, selectErrorMaxCount, selectErrorMinCount, selectMaxCount, selectMinCount } from '../model/counter-selectors';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

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
 
  const count = useAppSelector(selectCount)
  const minCount = useAppSelector(selectMinCount)
  const maxCount = useAppSelector(selectMaxCount)
  const errorMinValue = useAppSelector(selectErrorMinCount)
  const errorMaxValue = useAppSelector(selectErrorMaxCount)
  const [newMaxCount, setNewMaxCount] = useState(maxCount);
  const [newMinCount, setNewMinCount] = useState(minCount);
  const [isFocusInput, setIsFocusInput] = useState(false);
  const dispatch = useAppDispatch()

  const incCount = () => (count < maxCount) ? dispatch(incrementCountAC()) : count
  const resetCount = () => dispatch(resetCountAC())
  

  const handleSaveSettings = (newMinCount: number, newMaxCount: number) => {
    dispatch(saveNewSettingsAC({newMinCount, newMaxCount}))
    // localStorage.setItem("counterValue", JSON.stringify(minCountValue))
    // localStorage.setItem("maxCounterValue", JSON.stringify(maxCountValue))
    // localStorage.setItem("minCounterValue", JSON.stringify(minCountValue))
  }

  const changeMinCountHandler = (value: number) => {
    setNewMinCount(value);
    if (errorMaxValue) {
      dispatch(setErrorMaxValueAC(value <= newMinCount || value < 0))
    }
    dispatch(setErrorMinValueAC(value >= newMaxCount || value < 0))
  };

   const changeMaxCountHandler = (value: number) => {
    setNewMaxCount(value);
    if (errorMinValue) {
      dispatch(setErrorMinValueAC(value >= newMaxCount || value < 0))
    }
    dispatch(setErrorMaxValueAC(value <= newMinCount || value < 0))
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
