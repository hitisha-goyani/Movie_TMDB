import React from "react";

const Modal = ({ videoUrl, closeModal }) => {
  if (!videoUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={closeModal} // Close modal if clicking outside iframe
    >
      <div
        className="bg-black rounded-lg overflow-hidden relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside modal content
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 z-50 text-white bg-red-600 rounded-full px-3 py-1 font-bold"
        >
          X
        </button>
        <iframe
          width="100%"
          height="480"
          src={videoUrl}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Modal;