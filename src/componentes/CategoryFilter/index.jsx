import React from "react";
import "./CategoryFilter.css";

export default function CategoryFilter({ photos, selectedCategory, setSelectedCategory, isDark }) {
  // Inclui "Favoritas" como categoria extra
  const categories = ["Todas", "Favoritas", ...new Set(photos.map((photo) => photo.category))];

  return (
    <div className="category-scroll-container">
      <div className="category-container">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          const baseClass = isDark ? "category-dark" : "category-light";
          const activeClass = isActive
            ? isDark
              ? "category-active-dark"
              : "category-active-light"
            : "";

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-button ${baseClass} ${activeClass}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
