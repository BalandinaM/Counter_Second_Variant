import { useState } from "react";
import { Button } from "@/common/components/Button/Button";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { type CounterType, saveNewSettingsAC, setErrorMaxValueAC, setErrorMinValueAC } from "@/features/counter/model/counter-reducer"
import { Input } from "./Input/Input";


export type SettingsBlockProps = {
  counter: CounterType;
  handleOnBlur: () => void;
  handleFocus: () => void;
};

export const SettingsBlock = ({
  counter,
  handleOnBlur,
  handleFocus
}: SettingsBlockProps) => {
  const { minCount, maxCount, errorMinValue, errorMaxValue } = counter;
  const [newMaxCount, setNewMaxCount] = useState(maxCount);
  const [newMinCount, setNewMinCount] = useState(minCount);
  const dispatch = useAppDispatch();

  const handleSaveSettings = () => {
    dispatch(saveNewSettingsAC({ newMinCount, newMaxCount }));
  };

  const changeMinCountHandler = (value: number) => {
    setNewMinCount(value);
    const isErrorMaxValue = value <= newMinCount || value < 0
    const isErrorMinValue = value >= newMaxCount || value < 0
    if (counter.errorMaxValue) {
      dispatch(setErrorMaxValueAC(isErrorMaxValue));
    }
    dispatch(setErrorMinValueAC(isErrorMinValue));
  };

  const changeMaxCountHandler = (value: number) => {
    setNewMaxCount(value);
    const isErrorMaxValue = value <= newMinCount || value < 0
    const isErrorMinValue = value >= newMaxCount || value < 0
    if (counter.errorMinValue) {
      dispatch(setErrorMinValueAC(isErrorMinValue));
    }
    dispatch(setErrorMaxValueAC(isErrorMaxValue));
  };

  return (
    <div className="container">
      <div className="wrap_input">
        <Input
          value={newMinCount}
          setNewValue={changeMinCountHandler}
          handleFocus={handleFocus}
          handleOnBlur={handleOnBlur}
          error={errorMinValue}
        />
        <Input
          value={newMaxCount}
          setNewValue={changeMaxCountHandler}
          handleFocus={handleFocus}
          handleOnBlur={handleOnBlur}
          error={errorMaxValue}
        />
      </div>
      <Button
        title="set"
        callBack={handleSaveSettings}
        disabled={errorMinValue || errorMaxValue}
      />
    </div>
  );
};
