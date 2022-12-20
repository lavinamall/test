import React, { useState, useEffect } from "react";
import { URL } from ".././Constants.js";
import "../CSS/App.css";

function UserList() {
  const url = URL + "/UserList";
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
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
