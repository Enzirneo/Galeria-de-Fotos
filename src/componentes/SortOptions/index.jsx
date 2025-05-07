import React from "react";
import "./SortOptions.css";

export default function SortOptions({ sortOption, setSortOption, isDark }) {
  return (
    <div className="sort-container">
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className={`sort-select ${isDark ? "sort-dark" : "sort-light"}`}
      >
        <option value="name-asc">Nome (A-Z)</option>
        <option value="name-desc">Nome (Z-A)</option>
        <option value="date-newest">Mais Recentes</option>
        <option value="date-oldest">Mais Antigas</option>
      </select>
    </div>
  );
}
