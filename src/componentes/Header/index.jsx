import React from "react";
import "./Header.css";
import { FaSun, FaMoon } from "react-icons/fa"; // Ícones de Sol e Lua

export default function Header({ isDark, toggleTheme }) {
  return (
    <header className={`header ${isDark ? "header-dark" : "header-light"}`}>
      <h1 className="title">Minha Galeria</h1>
      <button
        onClick={toggleTheme}
        className={`theme-toggle ${isDark ? "theme-dark" : "theme-light"}`}
        aria-label="Alternar tema"
      >
        {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </header>
  );
}
