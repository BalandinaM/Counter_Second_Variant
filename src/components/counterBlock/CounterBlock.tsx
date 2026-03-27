import { Button } from "../button/Button";

export type CounterBlockProps = {
  count: number;
  minCount: number;
  maxCount: number;
  incCount: () => void;
  resetCount: () => void;
  isFocusInput: boolean
  errorMaxValue: boolean
  errorMinValue: boolean
};

export const CounterBlock = ({
  count,
  minCount,
  maxCount,
  incCount,
  resetCount,
  isFocusInput,
  errorMaxValue,
  errorMinValue,
}: CounterBlockProps) => {
  
  const isResetButtonDisabled = count === minCount
  const isIncrementButtonDisabled = count === maxCount || isFocusInput || (errorMinValue || errorMaxValue)
  const counterStyles = `${count !== maxCount ? "counter" : "counter_disabled"}`
  const isShowCount = !isFocusInput && !errorMinValue && !errorMaxValue && <span>{count}</span>
  const isShowError = (errorMinValue || errorMaxValue && isFocusInput) && <span style={{ color: 'red'}}>Error!!!!!</span>
  const isEnterValues = isFocusInput && !errorMinValue && !errorMaxValue && <span style={{ color: 'white'}}>enter values and press 'set'</span>
  
  return (
    <div className="wrap_counter">
      <div className="container">
        <div
          className={counterStyles}
        >
          {isShowCount}
          {isShowError} 
          {isEnterValues}

        </div>
        <div className="wrap_button">
          <Button
            title="inc"
            disabled={isIncrementButtonDisabled}
            callBack={incCount}
          />
          <Button
            title="reset"
            disabled={isResetButtonDisabled}
            callBack={resetCount}
          />
        </div>
      </div>
    </div>
  );
};
