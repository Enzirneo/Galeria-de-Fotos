import React, { useState, useEffect } from "react";
import Header from "./componentes/Header";
import SearchBar from "./componentes/SearchBar";
import CategoryFilter from "./componentes/CategoryFilter";
import SortOptions from "./componentes/SortOptions";
import Gallery from "./componentes/Gallery";
import Modal from "./componentes/Modal";
import UploadForm from "./componentes/UploadForm";
import { searchPhotos } from "./serviços/pexelsApi";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [sortOption, setSortOption] = useState("name-asc");
  const [isDark, setIsDark] = useState(false);
  const [userPhotos, setUserPhotos] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [pexelsPhotos, setPexelsPhotos] = useState([]);

  const categories = ["Todas", "Enviadas", "Favoritas", "Natureza", "Urbano", "Animais", "Tecnologia", "Pessoas"];

  const handleImageUpload = (name, category, url, date) => {
    const newPhoto = {
      id: Date.now(),
      title: name,
      category,
      url,
      date,
    };
    setUserPhotos((prev) => [...prev, newPhoto]);
  };

  useEffect(() => {
    const fetchPexelsPhotos = async () => {
      const query =
        searchTerm ||
        (selectedCategory !== "Todas" &&
        selectedCategory !== "Favoritas" &&
        selectedCategory !== "Enviadas"
          ? selectedCategory
          : "nature");

      const results = await searchPhotos(query);

      console.log("Fotos da API Pexels:", results);

      setPexelsPhotos(results); // ✅ Não mapeia novamente — já vem no formato certo
    };

    fetchPexelsPhotos();
  }, []);

  const allPhotos = [...userPhotos, ...pexelsPhotos];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredPhotos = allPhotos
    .filter((photo) => {
      const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todas"
          ? true
          : selectedCategory === "Favoritas"
            ? favorites.includes(photo.id)
            : selectedCategory === "Enviadas"
              ? userPhotos.some((p) => p.id === photo.id)
              : photo.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") return a.title.localeCompare(b.title);
      if (sortOption === "name-desc") return b.title.localeCompare(a.title);
      if (sortOption === "date-newest") return new Date(b.date) - new Date(a.date);
      if (sortOption === "date-oldest") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className={`App ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <div className="main-content flex-grow">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} isDark={isDark} />

        <div className="px-4 my-4">
          <button
            onClick={() => setShowUpload(true)}
            className={`upload-button ${isDark ? "upload-dark" : "upload-light"}`}
          >
            📷 Enviar nova imagem
          </button>
        </div>


        <CategoryFilter
          photos={allPhotos}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isDark={isDark}
        />

        <SortOptions sortOption={sortOption} setSortOption={setSortOption} isDark={isDark} />

        <Gallery
          photos={filteredPhotos}
          onPhotoClick={setSelectedPhoto}
          isDark={isDark}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />

        {selectedPhoto && (
          <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} isDark={isDark} />
        )}

        {showUpload && (
          <UploadForm
            handleImageUpload={handleImageUpload}
            categories={categories}
            onClose={() => setShowUpload(false)}
            isDark={isDark}
          />
        )}
      </div>
    </div>
  );
}
