import { Todo } from "../../../../types/todo.ts";

import styles from "./TodoItem.module.scss";
import Button from "../../common/Button.tsx";
import Input from "../../common/Input.tsx";

const TodoItem = ({
  todo,
  filter,
  onDoubleClick,
  onBlur,
  onAddOrEditTodo,
  onTodoStatusChange,
  onTodoRemove,
}: {
  todo: Todo;
  filter?: string;
  onDoubleClick?: any;
  onBlur?: (id: string) => void;
  onAddOrEditTodo?: (value: string, id?: string) => void;
  onTodoStatusChange?: (id: string, value: boolean) => void;
  onTodoRemove?: (id: string) => void;
}) => {
  const hidden =
    filter === "All"
      ? false
      : todo.completed
      ? filter === "Active"
      : filter === "Completed";

  return (
    <li
      className={styles["todo-item"] + " " + (hidden && styles.hidden)}
      onDoubleClick={() => onDoubleClick(todo._id)}
    >
      <div className={styles.view}>
        <input
          className={styles.toggle + " " + (todo.editing && styles.hidden)}
          type="checkbox"
          checked={todo.completed}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTodoStatusChange && onTodoStatusChange(todo._id, e.target.checked)
          }
        />
        {todo.editing ? (
          <Input
            type="text"
            name="description"
            todoId={todo._id}
            value={todo.description}
            className={
              styles.description + " " + (todo.editing && styles.editing)
            }
            autoFocus={true}
            onBlur={onBlur}
            onAddOrEditTodo={onAddOrEditTodo}
          />
        ) : (
          <label
            className={
              styles.description + " " + (todo.completed && styles.completed)
            }
          >
            {todo.description}
          </label>
        )}
        {!todo.editing && (
          <Button
            className={styles.destroy}
            onClick={() => onTodoRemove && onTodoRemove(todo._id)}
          />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
