import React, { useState, useEffect } from "react";
import { getAllUsers } from "../Functions.js";
import "../CSS/App.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await getAllUsers())
    };
    getUsers();
  }, []);

  return (
    <div>
      <div className="pageHeader">Client List</div>
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
