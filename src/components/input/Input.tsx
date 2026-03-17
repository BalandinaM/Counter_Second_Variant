
export type InputProps = {
  value: number;
  valueFriend: number
  setNewValue: (value: number) => void;
  handleFocus: () => void
  handleOnBlur: () => void
  error?: boolean;
};

export const Input = ({ value, setNewValue, handleFocus, handleOnBlur, error }: InputProps) => {

  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewValue(Number(e.currentTarget.value));
  };

  return (
    <input
      style={{ background: error ? "red" : "black" }}
      type="number"
      value={value}
      onChange={changeValueHandler}
      className="input"
      onFocus={handleFocus}
      onBlur={handleOnBlur}
    />
  );
};
