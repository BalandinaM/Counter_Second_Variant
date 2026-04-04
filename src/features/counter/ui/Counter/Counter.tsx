import { useState } from "react";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { CounterBlock } from "./CounterBlock/CounterBlock";
import { SettingsBlock } from "./SettingsBlock/SettingsBlock";
import { selectCounter } from "@/features/counter/model/counter-selectors";

export const Counter = () => {
  const counter = useAppSelector(selectCounter);
  const [isFocusInput, setIsFocusInput] = useState(false);

  const handleFocus = () => {
    setIsFocusInput(true);
  };
  const handleOnBlur = () => {
    setIsFocusInput(false);
  };

  return (
    <div className="wrap_counter">
      <CounterBlock counter={counter} isFocusInput={isFocusInput} />
      <SettingsBlock
        counter={counter}
        handleFocus={handleFocus}
        handleOnBlur={handleOnBlur}
      />
    </div>
  );
};
