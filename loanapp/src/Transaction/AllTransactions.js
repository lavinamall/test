import React, { useState, useEffect } from "react";
import { URL } from ".././Constants.js";
import "../CSS/App.css";

function AllTransactions() {
  const url = URL + "/AllTransactions";
  const [transactions, setTransactions] = useState([]);

  const getAllTransactions = async () => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setTransactions(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div>
      <div className="pageHeader">All Transactions</div>
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
                  <span className="label">Mode:</span> Cash
                </td>
                <td>
                  <span className="label">Month:</span> {transaction.duration}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="label">Overdue:</span>
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
