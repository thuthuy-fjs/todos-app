type ButtonProps = {
  className: string,
  text?: string,
  disabled?: boolean,
  onClick?: (e: any) => void,
};

const Button = ({
  text = "",
  className = "",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
