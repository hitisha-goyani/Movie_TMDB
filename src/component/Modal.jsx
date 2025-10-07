import React from "react";

const Modal = ({ videoUrl, closeModal }) => {
  if (!videoUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden">
        <iframe
          src={videoUrl}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;