import React from "react";

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        {/* <a className="navbar-brand" href="/">
          Home
        </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                All Transactions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/NewTransaction">
                New Transaction
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/UserList">
                Client List
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/NewUser">
                New Client
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
