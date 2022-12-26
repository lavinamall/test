import React, { useState, useEffect } from "react";
import { getAllTransactions } from "../Functions";
import { useNavigate } from "react-router-dom";
import "../CSS/App.css";

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const buttonRedirect = () => {
    navigate("/NewTransaction", { replace: true });
  };

  useEffect(() => {
    const getTransactions = async () => {
      setTransactions(await getAllTransactions());
    };
    getTransactions();
  }, []);

  return (
    <div>
      <div className="pageHeader input-group justify-content-center">
        All Transactions{" "}
        <div className="ml-5">
          <button
            type="submit"
            className="btn btn-light"
            onClick={buttonRedirect}
          >
            New
          </button>
        </div>
      </div>
      {transactions.map((transaction) => (
        <div className="transCard" key={transaction.transactionid}>
          <table>
            <thead colSpan="2">
              <tr>
                <th colSpan="3">{transaction.username}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{transaction.startdate}</td>
                <td>{transaction.enddate}</td>
              </tr>
              <tr>
                <td>
                  <span className="label">Amount:</span> {transaction.principal}
                </td>
                <td>
                  <span className="label">Interest:</span>{" "}
                  {transaction.interest}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="label">Mode:</span> {transaction.mode}
                </td>
                <td>
                  <span className="label">Month:</span> {transaction.duration}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="label">Overdue:</span>
                  {transaction.overdue} day(s)
                </td>
                <td>
                  <span className="label">Rate:</span> {transaction.rate}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AllTransactions;
