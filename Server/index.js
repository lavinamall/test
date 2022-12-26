const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = 3500;

app.use(cors());
app.use(express.json());

app.get("/UserList", async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT * FROM Users ORDER BY UserName ASC;"
    );
    res.json(users.rows);
    res.end();
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/UserList/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await pool.query("SELECT * FROM Users WHERE UserId = $1;", [
      id,
    ]);
    res.json(users.rows[0]);
    res.end();
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/AllTransactions", async (req, res) => {
  try {
    const query =
      "SELECT TransactionId, U.UserName, to_char(StartDate, 'DD Month YYYY') AS StartDate, to_char(EndDate, 'DD Month YYYY') AS EndDate,\
    TO_CHAR(Principal, '99G99G999') AS Principal, \
    TO_CHAR(Interest, '99G99G999')AS Interest, Rate, \
    Duration_in_months as Duration, \
    (CURRENT_DATE - EndDate) AS Overdue \
    FROM UserTransactions T INNER JOIN Users U ON T.UserId = U.UserId ORDER BY EndDate;";
    const users = await pool.query(query);
    res.json(users.rows);
    res.end();
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/NewTransaction", async (req, res) => {
  try {
    const fd = req.body.formData;
    const Amount = parseInt(fd.Amount);
    const Rate = parseFloat(fd.Rate);
    const Month = parseInt(fd.Month);
    const Interest = (Amount * Rate * Month) / 100;
    const StartDate = new Date(fd.startDate);
    const EndDate = new Date(
      StartDate.getFullYear(),
      StartDate.getMonth() + Month,
      StartDate.getDate() - 1
    );

    const query = await pool.query(
      "INSERT INTO UserTransactions (UserId,Duration_in_months,Principal,Rate,Interest,StartDate,EndDate) VALUES ($1, $2, $3, $4, $5, CAST($6 AS DATE), CAST($7 AS DATE))",
      [fd.UserId, Month, Amount, Rate, Interest, StartDate, EndDate]
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
    console.error(err.message);
  }
});

app.post("/NewUser", async (req, res) => {
  try {
    const fd = req.body.formData;
    const query = await pool.query(
      "INSERT INTO Users (UserName, Mobile, Address, Notes) VALUES ($1, $2, $3, $4)",
      [fd.UserName, fd.Mobile, fd.Address, fd.Notes]
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log("Your server is running on port:", PORT);
});
