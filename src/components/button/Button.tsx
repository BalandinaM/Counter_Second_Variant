type ButtonProps = {
  title: string;
  disabled?: boolean;
  callBack: () => void;
};

export const Button = ({ title, disabled, callBack }: ButtonProps) => {
  return (
    <button onClick={() => callBack()} disabled={disabled}>
      {title}
    </button>
  );
};
