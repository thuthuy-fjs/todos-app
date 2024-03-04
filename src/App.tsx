import { useEffect } from "react";
import styles from "./App.module.scss";
import Todos from "./components/Layouts/Todo";

function App() {
  useEffect(() => {
    document.title = "Todo: React";
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <h1>todos</h1>
        <Todos />
      </div>
      <div>
        <footer
          style={{ margin: "60px", display: "flex", justifyContent: "center" }}
        >
          Double-click to edit a todo
        </footer>
      </div>
    </>
  );
}

export default App;
