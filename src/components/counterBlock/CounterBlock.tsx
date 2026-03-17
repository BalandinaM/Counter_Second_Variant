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
  
  return (
    <div className="wrap_counter">
      <div className="container">
        <div
          className={`${count !== maxCount ? "counter" : "counter_disabled"}`}
        >
          {!isFocusInput && !errorMinValue && !errorMaxValue && <span>{count}</span>}
          {(errorMinValue || errorMaxValue && isFocusInput) && <span style={{ color: 'red'}}>Error!!!!!</span>}
          {isFocusInput && !errorMinValue && !errorMaxValue && <span style={{ color: 'white'}}>enter values and press 'set'</span>}

        </div>
        <div className="wrap_button">
          <Button
            title="inc"
            disabled={count === maxCount || isFocusInput || (errorMinValue || errorMaxValue)}
            callBack={incCount}
          />
          <Button
            title="reset"
            disabled={count === minCount}
            callBack={resetCount}
          />
        </div>
      </div>
    </div>
  );
};
