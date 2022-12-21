import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import { getAllUsers } from "../Functions.js";
import DatePicker from "react-datepicker";
import { URL } from "../Constants.js";

function NewTransaction() {
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({});

  const url = URL + "/NewTransaction";

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      if (res.status === 200) {
        console.log("Success");
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.error(err.message);
    }
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
      <form className="border" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Client</span>
          </div>
          <select
            className="custom-select"
            onChange={handleChange}
            placeholder="Choose Client"
            name="UserId"
          >
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
            type="number"
            min="0"
            className="form-control"
            name="Amount"
            onChange={handleChange}
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
            type="number"
            min="0"
            name="Rate"
            onChange={handleChange}
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
            type="text"
            className="form-control"
            name="Month"
            min="1"
            onChange={handleChange}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-append">
            <span className="input-group-text">Start Date</span>
            <DatePicker
              className="form-control"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTransaction;
