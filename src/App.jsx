import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.id;
    const index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto rounded-2xl m-5 p-5 bg-violet-100 min-h-[90vh] md:w-1/2">
        <div className="addTodo my-5 flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-center">iTask - Manage all your todos at one place</h1>
          <h2 className="font-bold text-2xl my-2">Add a Todo</h2>
          <div className="flex gap-2 justify-center items-center">
          <input
            type="text"
            onChange={handleChange}
            className="w-full h-8 rounded-xl py-5 px-1"
            placeholder="Type a todo here"
            value={todo}
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 text-sm font-bold rounded-full text-white w-20 disabled:bg-violet-400 my-2 mx-2 p-2 "
            disabled={todo.length <= 3}
          >
            Add
          </button>
          </div>
        </div>
        <input
          className="my-4"
          type="checkbox"
          checked={showFinished}
          onChange={toggleFinished}
          id="show"
        />{" "}
        <label htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-indigo-700 opacity-30 w-[90%] mx-auto"></div>
        <h2 className="font-bold text-2xl my-4">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-4">No todos to be disaplyed</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between my-2 hover:bg-violet-200 p-2 rounded-full"
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      id={item.id}
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      <div className="font-semibold">
                      {item.todo}
                      </div>
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md text-white mx-4"
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold rounded-md text-white"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
