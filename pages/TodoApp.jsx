import React from "react";
import Login from "./Login";
import Welcome from "./Welcome";
import Register from "./Register";
import TodoList from "./TodoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthGuard } from "../auth/auth.guard";
import CreateTodo from "./CreateTodo";
import UpdateTodo from "./Update";

const TodoApp = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <Welcome />
              </AuthGuard>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/create"
            element={
              <AuthGuard>
                <CreateTodo />
              </AuthGuard>
            }
          />
          <Route
            path="/update/:id"
            element={
              <AuthGuard>
                <UpdateTodo />
              </AuthGuard>
            }
          />
          <Route
            path="/todos"
            element={
              <AuthGuard>
                <TodoList />{" "}
              </AuthGuard>
            }
          />

          <Route path="*" element={<div>error</div>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default TodoApp;
