import React from "react";
import { Link, NavLink } from "reactor-router-dom";

const Navbar = props => {
  return (
    <div className="navbar navbar-light bg-dark">
      <Link to="/" className="navbar-brand">
        Guggle Book Search
      </Link>
      <nav className="d-flex ml-auto">
        <NavLink
          to="/"
          className="nav-link text-white"
          activeClassName="active"
        >
          Search
        </NavLink>
        <NavLink
          to="/saved"
          className="nav-link text-white"
          activeClassName="active"
        >
          Saved
        </NavLink>
      </nav>
    </div>
  );
};
