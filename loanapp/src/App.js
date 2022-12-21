import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTransactions from "./Transaction/AllTransactions.js";
import NewTransaction from "./Transaction/NewTransaction.js";
import UserList from "./User/UserList.js";
// import "./CSS/App.css";
  
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        {/* <Header></Header> */}
        <Routes>
          <Route path="/" element={<AllTransactions />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/NewTransaction" element={<NewTransaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
