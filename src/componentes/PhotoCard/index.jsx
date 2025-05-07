import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./PhotoCard.css";

export default function PhotoCard({ photo, onClick, isDark, favorites, toggleFavorite }) {
  const isFavorite = Array.isArray(favorites) && favorites.includes(photo.id);

  const heartIcon = isFavorite ? (
    <FaHeart className="heart-icon filled" />
  ) : (
    <FaRegHeart className="heart-icon" />
  );

  return (
    <motion.div
  key={photo.id}
  className={`photo-card ${isDark ? "photo-card-dark" : ""} rounded shadow overflow-hidden`}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 10 }}
  transition={{ duration: 0.2, ease: "easeInOut" }}
  onClick={() => onClick(photo)}
>
      <img
        src={photo.url}
        alt={photo.title}
        className="photo-img w-full h-60 object-cover rounded-t"
      />
      <div className="photo-info">
        <div className="photo-title-container">
          <h3 className="photo-title">{photo.title}</h3>
          <button
            className="favorite-button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(photo.id);
            }}
          >
            {heartIcon}
          </button>
        </div>
        <p className="photo-category">{photo.category ?? "Sem categoria"}</p>
        {photo.date && <p className="photo-date">📅 {photo.date}</p>}
      </div>
    </motion.div>
  );
}
