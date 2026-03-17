import { Button } from "../button/Button";
import { Counter } from "../counter/Counter";

export type CounterBlockProps = {
  count: number;
  minCount: number;
  maxCount: number;
  incCount: () => void;
  resetCount: () => void;
};

export const CounterBlock = ({
  count,
  minCount,
  maxCount,
  incCount,
  resetCount,
}: CounterBlockProps) => {
  
  return (
    <div className="container">
      <Counter count={count} maxCount={maxCount} />
      <div className="wrap_button">
        <Button title="inc" disabled={count === maxCount} callBack={incCount} />
        <Button title="reset" disabled={count === minCount} callBack={resetCount} />
      </div>
    </div>
  );
};
