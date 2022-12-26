import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { URL } from "../Constants.js";

function NewUser() {
  const url = URL + "/NewUser";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

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
        alert("Transaction Added!");
      } else {
        console.log("Error");
        alert("ERROR!");
      }
    } catch (err) {
      console.error(err.message);
    }
    navigate("/UserList", { replace: true });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({
      ...values,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="pageHeader">New Client</div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Name</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="UserName"
            onChange={handleChange}
          />
          <div className="input-group-append"></div>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Mobile</span>
          </div>
          <input
            type="number"
            className="form-control"
            name="Mobile"
            onChange={handleChange}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Address</span>
          </div>
          <textarea
            rows="4"
            type="text"
            className="form-control"
            name="Address"
            onChange={handleChange}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Notes</span>
          </div>
          <textarea
            rows="4"
            type="text"
            className="form-control"
            name="Notes"
            onChange={handleChange}
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

export default NewUser;
