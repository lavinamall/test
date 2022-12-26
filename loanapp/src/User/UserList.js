import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../Functions.js";
import "../CSS/App.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const buttonRedirect = () => {
    navigate("/NewUser", { replace: true });
  }

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await getAllUsers());
    };
    getUsers();
  }, []);

  return (
    <div>
      <div className="pageHeader input-group justify-content-center">
        Client List
        <div className="ml-5">
          <button
            type="submit"
            className="btn btn-light"
            onClick={buttonRedirect}
          >
            Add New Client
          </button>
        </div>
      </div>

      {users.map((user) => (
        <div className="UserCard" key={user.userid}>
          <div className="card">
            <img src="./Images/Lavina.jpeg" alt="user img"></img>
            <div className="info">
              <span>{user.username}</span> | <span>{user.mobile}</span>
              <br />
              <span>{user.address}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
