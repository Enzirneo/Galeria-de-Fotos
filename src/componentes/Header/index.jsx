import React from "react";
import "./Header.css";
import { FaSun, FaMoon } from "react-icons/fa";
import SearchBar from "../SearchBar";

export default function Header({ isDark, toggleTheme, searchTerm, setSearchTerm }) {
  return (
    <header className={`header ${isDark ? "header-dark" : "header-light"}`}>
      <div className="header-top">
        <h1 className="title">Minha Galeria</h1>

        <div className="search-bar-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} isDark={isDark} />
        </div>

        <button
          onClick={toggleTheme}
          className={`theme-toggle ${isDark ? "theme-dark" : "theme-light"}`}
          aria-label="Alternar tema"
        >
          {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </header>
  );
}
