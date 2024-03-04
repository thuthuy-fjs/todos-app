import { KeyboardEvent, useState } from "react";

type InputProps = {
  type: "text" | "email" | "number" | "password";
  name?: string;
  todoId?: string;
  value?: string;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onBlur?: (id: string) => void;
  onAddOrEditTodo?: (value: string, id?: string) => void;
};

const Input = ({
  type = "text",
  name = "",
  todoId = "",
  value = "",
  className = "",
  placeholder = "",
  autoFocus = false,
  onBlur,
  onAddOrEditTodo,
}: InputProps) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (inputValue.trim() != '' && e.key === "Enter") {
      onAddOrEditTodo && onAddOrEditTodo(inputValue.trim(), todoId);
      !todoId && setInputValue("");
    }

    if (e.key === 'Escape') {
      onAddOrEditTodo && onAddOrEditTodo(value, todoId);
    }
  };

  return (
    <input
      name={name}
      className={className ?? name}
      value={inputValue}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={(e: any) => setInputValue(e.target.value)}
      onBlur={() => onBlur && onBlur(todoId)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
