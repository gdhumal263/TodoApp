import React from "react";
import TodoService from "../services/TodoService";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user);
  const [todos, setTodos] = useState([]);
  // List all todos
  useEffect(() => {
    TodoService.listAllTodos(currentUser)
      .then((response) => {
        console.log(response);
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //Create Todos
  const createTodoHandler = () => {
    navigate("/create");
  };

  const [isDeleted, setIsDeleted] = useState(false);
  const deleteHandler = (id) => {
    TodoService.deleteTodo(id)
      .then((response) => setIsDeleted(response.data))
      .catch((error) => console.log(error));

      // if (isDeleted === true) {
      //   TodoService.listAllTodos(currentUser)
      //     .then((response) => {
      //       setTodos(response.data);
      //     })
      //     .catch((error) => console.log(error));
      //   setIsDeleted(false);
      // }
  };

  if (isDeleted === true) {
    TodoService.listAllTodos(currentUser)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
    setIsDeleted(false);
  }

  const updateHandler = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div>
      <h2 className="fw-light mt-2">List Todos</h2>
      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Completed</th>
              <th>Target Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.isDone ? "True" : "False"}</td>
                <td>{todo.targetDate}</td>
                <td>
                  <button
                    className="btn btn-md btn-danger"
                    onClick={() => deleteHandler(todo.id)}
                  >
                    Delete
                  </button>{" "}
                  <button
                    className="btn btn-md btn-success"
                    onClick={() => updateHandler(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-md btn-secondary"
          onClick={createTodoHandler}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default TodoList;
