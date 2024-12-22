import React, { useState, useEffect } from "react";

const SavedPage = () => {
  const [savedImages, setSavedImages] = useState([]); // State to hold bookmarked image objects

  useEffect(() => {
    // Load bookmarked image IDs from localStorage
    const bookmarkedIds = JSON.parse(localStorage.getItem("bookmarkedImages")) || [];
    const uploadedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];

    // Filter images that match the bookmarked IDs
    const bookmarkedImages = uploadedImages.filter((image) => bookmarkedIds.includes(image.id));
    setSavedImages(bookmarkedImages);
  }, []);

  return (
    <div className="page-container">
      <h2 className="saved-heading" style={{ textAlign: "center" }}>Saved Images</h2>

      {savedImages.length === 0 ? (
        <p className="no-images">No saved images to display.</p> // If no saved images exist
      ) : (
        <div className="gallery-container">
          {savedImages.map((image) => (
            <div key={image.id} className="image-container">
              <img
                src={image.url}
                alt="Saved"
                className="image-item"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;
