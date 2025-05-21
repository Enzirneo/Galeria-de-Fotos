import React from "react";
import PhotoCard from "../PhotoCard";

export default function Gallery({ photos, onPhotoClick, isDark, favorites, toggleFavorite }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 px-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onClick={onPhotoClick}
          isDark={isDark}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
