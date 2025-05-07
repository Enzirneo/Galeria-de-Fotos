import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";

export default function Modal({ photo, onClose, isDark }) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
