
export type InputProps = {
  value: number;
  setNewValue: (value: number | undefined) => void;
  handleFocus: () => void
  handleOnBlur: () => void
  error: boolean  
};

export const Input = ({ value, setNewValue, handleFocus, handleOnBlur, error }: InputProps) => {

  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        //ситуация связаннвя с тем что если удалить значение в инпуте, и последующем  вводе появляется ноль перед цифрой.
        // if (e.currentTarget.value === '') {
        //   return setNewValue(undefined)//Филипп советовал сделать так что бы значение обнулялось и кнопка дизйблилась
        // }
    
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
