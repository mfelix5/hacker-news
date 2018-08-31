import React from 'react';
import './App.css';

const Navbar = ({ value, onChange, onSubmit, children }) =>
    <div className="nav">
      <h1>hacker news client</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    </div>

export default Navbar;