import React from "react";
import "./SearchBar.css";

export default function SearchBar({ searchTerm, setSearchTerm, isDark }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`search-input ${isDark ? "search-dark" : "search-light"}`} // Alteração aqui
      />
    </div>
  );
}
