import React from "react";
import { useState } from "react";
import TodoService from "../services/TodoService";
import { useSelector } from "react-redux";
import Todo from "./../model/todo";
import { useParams } from "react-router-dom";

const UpdateTodo = () => {
  const id = useParams();
  const todoId = id["id"];

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
  const [isDone, setIsDone] = useState(false);
  const isDoneHandler = (event) => {
    console.log(event.target.checked);
    setIsDone(event.target.checked);
  };

  const [res, setRes] = useState("");
  const [err, setErr] = useState("");
  const submitUpdateFormHandler = (event) => {
    event.preventDefault();

    const todoData = new Todo();
    todoData.id = todoId;
    todoData.description = todo.description;
    todoData.targetDate = todo.targetDate;
    todoData.isDone = isDone;
    todoData.userId = currentUser.id;
    console.log(todoData);
    TodoService.updateTodo(todoData)
      .then((response) => setRes("Updated!"))
      .catch((error) => setErr("Something went wrong!"));
  };

  return (
    <div className="container mt-5">
      <div className="card ms-auto me-auto p-2 shadow-lg custom-card">
        <div className="card-header">
          <div className="card-title">UPDATE</div>
        </div>
        {err && <div className="alert alert-danger">{err}</div>}
        {res && <div className="alert alert-success">{res}</div>}

        <form onSubmit={submitUpdateFormHandler}>
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
          <label className="mt-3">Is Done</label> {"  "}
          <input
            type="checkbox"
            checked={isDone}
            onChange={isDoneHandler}
            className="mb-3 p-3"
          /><br></br>
          <button type="submit" className="mt-4 btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodo;
