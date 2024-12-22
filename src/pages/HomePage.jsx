import React, { useState, useEffect } from "react";

function HomePage() {
  const [images, setImages] = useState([]); // Array to hold images
  const [likedImages, setLikedImages] = useState([]); // Array to hold liked image IDs
  const [bookmarkedImages, setBookmarkedImages] = useState([]); // Array to hold bookmarked image IDs
  const [selectedImageId, setSelectedImageId] = useState(null); // ID of image to be deleted

  useEffect(() => {
    // Load images from localStorage or fallback to empty array
    const savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setImages(savedImages);

    // Load liked images from localStorage or fallback to empty array
    const savedLikedImages = JSON.parse(localStorage.getItem("likedImages")) || [];
    setLikedImages(savedLikedImages);

    // Load bookmarked images from localStorage or fallback to empty array
    const savedBookmarkedImages =
      JSON.parse(localStorage.getItem("bookmarkedImages")) || [];
    setBookmarkedImages(savedBookmarkedImages);
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedImageId(id); // Set the image ID for deletion
  };

  const closeModal = () => {
    setSelectedImageId(null); // Close the modal without deleting
  };

  const confirmDelete = () => {
    // Remove image from the state and update localStorage
    const updatedImages = images.filter((image) => image.id !== selectedImageId);
    setImages(updatedImages);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages)); // Update localStorage

    setSelectedImageId(null); // Close the modal after deletion
  };

  const toggleLike = (id) => {
    const updatedLikedImages = likedImages.includes(id)
      ? likedImages.filter((likedId) => likedId !== id)
      : [...likedImages, id];
    setLikedImages(updatedLikedImages);
    localStorage.setItem("likedImages", JSON.stringify(updatedLikedImages)); // Update localStorage
  };

  const toggleBookmark = (id) => {
    const updatedBookmarkedImages = bookmarkedImages.includes(id)
      ? bookmarkedImages.filter((bookmarkedId) => bookmarkedId !== id)
      : [...bookmarkedImages, id];
    setBookmarkedImages(updatedBookmarkedImages);
    localStorage.setItem(
      "bookmarkedImages",
      JSON.stringify(updatedBookmarkedImages)
    ); // Update localStorage
  };

  return (
    <div className="page-container">
      <h2 className="gallery-heading" style={{textAlign:'center'}}>Gallery</h2>

      {images.length === 0 ? (
        <p className="no-images">No images to display.</p> // If no images exist
      ) : (
        <div className="gallery-container">
          {images.map((image) => (
            <div key={image.id} className="image-container">
              <img src={image.url} alt={image.name} className="image-item" />
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(image.id)}
              >
                <i className="fa-solid fa-trash"></i> {/* Delete button */}
              </button>
              <button
                className={`like-btn ${likedImages.includes(image.id) ? "liked" : ""}`}
                onClick={() => toggleLike(image.id)}
              >
                {likedImages.includes(image.id) ? (
                  <i className="fa-solid fa-thumbs-up"></i> // Liked button
                ) : (
                  <i className="fa-regular fa-thumbs-up"></i> // Not liked button
                )}
              </button>
              <button
        className={`bookmark-btn ${
          bookmarkedImages.includes(image.id) ? "bookmarked" : ""
        }`}
        onClick={() => toggleBookmark(image.id)}
      >
        {bookmarkedImages.includes(image.id) ? (
          <i className="fa-solid fa-bookmark"></i> // Saved
        ) : (
          <i className="fa-regular fa-bookmark"></i> // Not saved
        )}
      </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for delete confirmation */}
      {selectedImageId !== null && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this image?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
