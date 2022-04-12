import { useState } from "react";
import "./App.css";
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Nguyen tien Huy" },
    { id: 2, title: "FPT software" },
    { id: 3, title: "Ha Noi" },
  ]);

  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;
    const todoNewList = [...todoList];
    console.log(typeof todoNewList);
    console.log(todoNewList);
    todoNewList.splice(index, 1);
    setTodoList(todoNewList);
  }

  return (
    <div className="App">
      <h1>Hello world!</h1>
      <ColorBox />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  );
}

export default App;
