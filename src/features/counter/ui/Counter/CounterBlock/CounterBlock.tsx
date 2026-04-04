import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { incrementCountAC, resetCountAC, type CounterType } from "@/features/counter/model/counter-reducer";
import { Button } from "@/common/components/Button/Button";

export type CounterBlockProps = {
  counter: CounterType;
  isFocusInput: boolean
};

export const CounterBlock = ({
  counter,
  isFocusInput,
}: CounterBlockProps) => {
  const {count, minCount, maxCount, errorMinValue, errorMaxValue} = counter
  const dispatch = useAppDispatch();

  const incCount = () => count < maxCount ? dispatch(incrementCountAC()) : count
  const resetCount = () => dispatch(resetCountAC())
  
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
