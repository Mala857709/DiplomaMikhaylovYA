import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Потребление ресурсов</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Графики (Реальное время)</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/period-charts">Графики (За период)</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/table">Таблица</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;