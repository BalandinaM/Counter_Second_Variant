import style from "./counter.module.css";

type CounterProps = {
  count:number;
  maxCount: number;
};

export const Counter = ({ count, maxCount }: CounterProps) => {
  return (
    <div
      className={`${style.counter} ${count === maxCount ? style.counter_disabled : ''}`}
    >
      <span>{count}</span>
    </div>
  );
};
