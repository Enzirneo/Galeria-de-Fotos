import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './UploadForm.css';

export default function UploadForm({ handleImageUpload, categories, onClose, isDark }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Nature");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && category && url && date) {
      handleImageUpload(name, category, url, date);
      setName("");
      setCategory("Nature");
      setUrl("");
      setDate("");
      onClose(); // Fecha o modal após o envio
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Botão de fechar fora do conteúdo */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <motion.div
          className={`modal-content ${isDark ? "modal-dark" : "modal-light"}`} // Alterna entre as classes modal-light e modal-dark
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className={`${isDark ? "text-white" : "text-gray-800"}`}>Adicionar nova imagem</h2>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
              <label htmlFor="name" className={`${isDark ? "text-white" : "text-gray-800"}`}>Nome da Imagem</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`${isDark ? "bg-gray-700 text-white" : "bg-white text-black"} border`}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className={`${isDark ? "text-white" : "text-gray-800"}`}>Categoria</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className={`${isDark ? "bg-gray-700 text-white" : "bg-white text-black"} border`}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="url" className={`${isDark ? "text-white" : "text-gray-800"}`}>URL da Imagem</label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className={`${isDark ? "bg-gray-700 text-white" : "bg-white text-black"} border`}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date" className={`${isDark ? "text-white" : "text-gray-800"}`}>Data</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={`${isDark ? "bg-gray-700 text-white" : "bg-white text-black"} border`}
              />
            </div>
            <button type="submit" className={`upload-button ${isDark ? "bg-gray-700 text-white" : "bg-white text-black"} border`}>
              Adicionar Imagem
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
