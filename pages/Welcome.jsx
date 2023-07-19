import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HelloWorldService from "../services/HelloWorldService";
import { useState } from "react";

const Welcome = () => {
  const currentUser = useSelector((state) => state.user);
    console.log(currentUser?.username);
  const [successResponse, setSuccessResponse] = useState("");
  const helloWorldService = () =>{
    HelloWorldService.executeHelloWorldService(currentUser?.username)
    .then(response => setSuccessResponse(response.data))
    .catch(error => setSuccessResponse(error.message))
  }

  return (
    <div className="container mt-5">
      <div className="ms-auto me-auto p-3">
        <div>
          <h2 className="fw-light">Welcome {currentUser?.username}.</h2>
          {/* <h4 className="fw-light">
            You can manage your todos <Link to={"/todos"}>here.</Link>
          </h4>
          <button className="btn btn-primary" onClick={helloWorldService}>Click Here!</button>
          <h4 className="fw-light mt-2">{successResponse}</h4> */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
