import { useState } from "react";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

export type SettingsBlockProps = {
  minCount: number;
  maxCount: number;
  errorMinValue: boolean;
  handleSaveSettings: (minCountValue: number, maxCountValue: number) => void;
  handleErrorMinValue: (boolean: boolean) => void;
};

export const SettingsBlock = ({
  minCount,
  maxCount,
  errorMinValue,
  handleSaveSettings,
  handleErrorMinValue,
}: SettingsBlockProps) => {
  const [newMaxCount, setNewMaxCount] = useState(maxCount);
  const [newMinCount, setNewMinCount] = useState(minCount);

  // const errorMinValue = newMinCount >= newMaxCount || newMinCount < 0;
  // const errorMaxValue = newMaxCount <= newMinCount || newMaxCount < 0;

  const changeMinCountHandler = (value: number) => {
    if (newMaxCount <= newMinCount || newMaxCount < 0) {
      handleErrorMinValue(true)
    }
    setNewMinCount(value);
  };

   const changeMaxCountHandler = (value: number) => {
    setNewMaxCount(value);
  };


  return (
    <div className="container">
      <div className="wrap_input">
        <Input
          value={newMinCount}
          setNewValue={changeMinCountHandler}
          error={errorMinValue}
        />
        <Input
          value={newMaxCount}
          setNewValue={changeMaxCountHandler}
          error={errorMaxValue}
        />
      </div>
        <Button
          title="set"
          callBack={() => handleSaveSettings(newMinCount, newMaxCount)}
          disabled={errorMinValue || errorMaxValue}
        />
    </div>
  );
};
