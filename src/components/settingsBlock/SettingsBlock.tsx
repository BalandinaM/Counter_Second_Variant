import { Button } from "../button/Button";
import { Input } from "../input/Input";

export type SettingsBlockProps = {
  maxCount: number;
  minCount: number;
  handleSaveSettings: (newMinCount: number, newMaxCount: number) => void;
  changeMinCountHandler: (value: number) => void
  changeMaxCountHandler: (value: number) => void
  handleFocus: () => void
  handleOnBlur: () => void
  errorMinValue: boolean
  errorMaxValue: boolean
};

export const SettingsBlock = ({
  maxCount,
  minCount,
  handleSaveSettings,
  changeMinCountHandler,
  changeMaxCountHandler,
  handleFocus,
  handleOnBlur,
  errorMinValue,
  errorMaxValue
}: SettingsBlockProps) => {


  return (
    <div className="container">
        <div className="wrap_input">
          <Input
            value={minCount}
            setNewValue={changeMinCountHandler}
            handleFocus={handleFocus}
            handleOnBlur={handleOnBlur}
            error={errorMinValue}
          />
          <Input
            value={maxCount}
            setNewValue={changeMaxCountHandler}
            handleFocus={handleFocus}
            handleOnBlur={handleOnBlur}
            error={errorMaxValue}
          />
        </div>
        <Button
          title="set"
          callBack={() => handleSaveSettings(minCount, maxCount)}
          disabled={errorMinValue || errorMaxValue}
        />
      </div>
  );
};
