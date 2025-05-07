import React from "react";
import "./SearchBar.css";

export default function SearchBar({ searchTerm, setSearchTerm, isDark }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por título..."
        className={`search-input ${isDark ? "search-dark" : "search-light"}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
