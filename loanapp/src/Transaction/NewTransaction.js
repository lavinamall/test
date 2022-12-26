import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../Functions.js";
import DatePicker from "react-datepicker";
import { URL } from "../Constants.js";

function NewTransaction() {
  const url = URL + "/NewTransaction";
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({ startDate: startDate });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({
      ...values,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      if (res.status === 200) {
        console.log("Success");
        alert("Transaction Added!");
      } else {
        console.log("Error");
        alert("ERROR!");
      }
    } catch (err) {
      console.error(err.message);
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="pageHeader">New Transaction</div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Client</span>
          </div>
          <select
            className="custom-select"
            onChange={handleChange}
            defaultValue={0}
            name="UserId"
            autoFocus
            required
          >
            <option key="0">Client</option>
            {users.map((user) => (
              <option key={user.userid} value={user.userid}>
                {user.username}
              </option>
            ))}
          </select>
          <div className="input-group-append"></div>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Amount</span>
          </div>
          <input
            className="form-control"
            onChange={handleChange}
            name="Amount"
            type="number"
            required
            min="0"
          />
          <div className="input-group-append">
            <span className="input-group-text">.00</span>
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Rate</span>
          </div>
          <input
            className="form-control"
            onChange={handleChange}
            type="decimal"
            name="Rate"
            min="0"
          />
          <div className="input-group-append">
            <span className="input-group-text">%</span>
          </div>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-append">
            <span className="input-group-text">Months</span>
          </div>
          <input
            className="form-control"
            onChange={handleChange}
            name="Month"
            type="text"
            required
            min="1"
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-append">
            <span className="input-group-text">Mode</span>
          </div>
          <input
            placeholder="Cash or Bank"
            className="form-control"
            onChange={handleChange}
            name="Mode"
            type="text"
          />
        </div>

        <div className="input-group mb-3">
          <DatePicker
            dateFormat="d MMMM y h:mm aa"
            className="form-control"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setFormData({ ...formData, startDate: date });
            }}
            name="startDate"
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTransaction;
