import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTransactions from "./Transaction/AllTransactions.js";
import NewTransaction from "./Transaction/NewTransaction.js";
import UserList from "./User/UserList.js";
import NewUser from "./User/NewUser.js";
import Header from "./Header.js";
import "./CSS/App.css";

function App() {
  return (
    <div className="container">
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllTransactions />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/NewTransaction" element={<NewTransaction />} />
          <Route path="/NewUser" element={<NewUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
