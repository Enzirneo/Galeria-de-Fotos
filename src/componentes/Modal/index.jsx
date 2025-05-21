import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";

export default function Modal({ photo, onClose, isDark }) {

  const handleDownload = async (url, filename = "imagem.jpg") => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Erro ao baixar a imagem:", error);
    }
  };

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>

          <motion.div
            className={`modal-content ${isDark ? "modal-dark" : ""}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img src={photo.url} alt={photo.title} className="modal-img" />
            <div>
              <h2 className="modal-title">{photo.title}</h2>
              <p className="modal-category">{photo.category}</p>

              <button
                onClick={() => handleDownload(photo.url, `${photo.title || "imagem"}.jpg`)}
                className={`modal-download-btn ${isDark ? "download-dark" : "download-light"}`}
              >
                 Baixar imagem
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
