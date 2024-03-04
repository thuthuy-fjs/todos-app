import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Input from "../../Layouts/common/Input.tsx";

import { Todo } from "../../../types/todo.ts";
import TodoItem from "./TodoItem/index.tsx";
import styles from "./Todos.module.scss";
import Button from "../common/Button.tsx";
import { DEFAULT_FILTER } from "../../../helpers/constant.ts";

const Todos = () => {
  const defaultFilters = DEFAULT_FILTER;

  const location = useLocation();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>(
    location.pathname === "/"
      ? "All"
      : location.pathname === "/active"
      ? "Active"
      : "Completed"
  );

  const handleAddOrEditTodo = (description: string, id?: string) => {
    if (!id) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          _id: crypto.randomUUID(),
          description: description,
          completed: false,
          editing: false,
        },
      ]);
    } else {
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo._id !== id) return todo;
          return {
            ...todo,
            description: description,
            editing: false,
          };
        });
      });
    }
  };

  const handleTodoStatusChange = (id: string, isChecked: boolean) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo._id !== id) return todo;
        return {
          ...todo,
          completed: isChecked,
        };
      });
    });
  };

  const handleTodoRemove = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => {
        return todo._id != id;
      });
    });
  };

  const handleDoubleClick = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo._id !== id) return todo;
        return {
          ...todo,
          editing: true,
        };
      });
    });
  };

  const handleBlur = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo._id !== id) return todo;
        return {
          ...todo,
          editing: false,
        };
      });
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles["input-container"]}>
        <input
          className={
            styles["toggle-all"] + " " + (todos?.length > 0 && styles.show)
          }
          type="checkbox"
          onClick={() => {
            const todoActive = todos.find((todo) => !todo.completed);
            setTodos((prevTodos) => {
              return prevTodos.map((todo) => {
                return {
                  ...todo,
                  completed: todoActive ? true : false,
                };
              });
            });
          }}
        />
        <Input
          type="text"
          className={styles["new-todo"]}
          name="description"
          placeholder="What needs to be done?"
          onAddOrEditTodo={handleAddOrEditTodo}
        />
      </div>
      {todos?.length > 0 && (
        <>
          <div className={styles.main}>
            <ul className={styles["todo-list"]}>
              {todos.map((todo) => {
                return (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    filter={filter}
                    onDoubleClick={handleDoubleClick}
                    onBlur={handleBlur}
                    onAddOrEditTodo={handleAddOrEditTodo}
                    onTodoStatusChange={handleTodoStatusChange}
                    onTodoRemove={handleTodoRemove}
                  />
                );
              })}
            </ul>
          </div>
          <div className={styles["todo-info"]}>
            <span className={styles["todo-count"]}>
              {todos.reduce((count, value) => {
                return !value.completed ? count + 1 : count;
              }, 0) + " items left!"}
            </span>
            <ul className={styles.filters}>
              {defaultFilters.map((defaultFilter) => {
                const hrefText =
                  defaultFilter.name === "All"
                    ? "/"
                    : defaultFilter.name === "Active"
                    ? "/active"
                    : "/completed";
                return (
                  <li
                    key={defaultFilter.id}
                    onClick={(e: any) => setFilter(e.target.textContent)}
                  >
                    <Link
                      to={`${hrefText}`}
                      className={
                        styles["content-filter"] +
                        " " +
                        (filter === defaultFilter.name && styles.selected)
                      }
                    >
                      {defaultFilter.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button
              className={styles["clear-completed"]}
              text="Clear completed"
              onClick={() => {
                setTodos((prevTodos) => {
                  return prevTodos.filter((todo) => {
                    return !todo.completed;
                  });
                });
              }}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Todos;
