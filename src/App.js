import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import queryString from "query-string";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Nguyen tien Huy" },
    { id: 2, title: "FPT software" },
    { id: 3, title: "Ha Noi" },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 40,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fecth post list:", error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;
    const todoNewList = [...todoList];
    todoNewList.splice(index, 1);
    setTodoList(todoNewList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todoList.slice(-1)[0].id + 1,
      ...formValues,
    };

    const todoNewList = [...todoList];
    todoNewList.push(newTodo);
    setTodoList(todoNewList);
  }

  return (
    <div className="App">
      <h1>Hello world!</h1>
      {/* <ColorBox /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
