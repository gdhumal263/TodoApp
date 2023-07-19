import React from "react";
import { useState } from "react";
import TodoService from "../services/TodoService";
import { useSelector } from "react-redux";
import Todo from "./../model/todo";

const CreateTodo = () => {

  const INPUT_CSS = {
    padding: "0 30px 0 30px",
  };

  const currentUser = useSelector((state) => state.user);

  const [todo, setTodo] = useState("", "");
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTodo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const [res, setRes] = useState("");
  const [err, setErr] = useState("");
  const submitCreateFormHandler = (event) => {
    event.preventDefault();

    const todoData = new Todo();
    todoData.description = todo.description;
    todoData.targetDate = todo.targetDate;
    todo.userId = currentUser?.id;

    TodoService.createTodo(todo)
      .then((response) => setRes("Created!"))
      .catch((error) => setErr("Something went wrong!"));
  };

  return (
    <div className="container mt-5">
      <div className="card ms-auto me-auto p-2 shadow-lg custom-card">
        <div className="card-header">
          <div className="card-title">Create</div>
        </div>
          <div className="card-body">
            {err && <div className="alert alert-danger">{err}</div>}

            {res && <div className="alert alert-success">{res}</div>}

            <form onSubmit={submitCreateFormHandler}>
              <div>Description</div>
              <div style={INPUT_CSS}>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mt-3">Complition Date</div>
              <div style={INPUT_CSS}>
                <input
                  type="date"
                  name="targetDate"
                  className="form-control"
                  placeholder="Complition Date"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button type="submit" className="mt-4 btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default CreateTodo;
