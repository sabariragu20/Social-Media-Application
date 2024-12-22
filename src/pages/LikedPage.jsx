import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const LikedPage = () => {
  const [likedImages, setLikedImages] = useState([]);

  useEffect(() => {
    // Get liked image IDs from localStorage
    const likedImageIds = JSON.parse(localStorage.getItem("likedImages")) || [];
    // Get all uploaded images from localStorage
    const allImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    // Filter only liked images
    const likedPosts = allImages.filter((image) => likedImageIds.includes(image.id));
    setLikedImages(likedPosts);
  }, []);

  return (
    <div>
        <Sidebar/>
    <div className="page-container">
      <div className="gallery-content">
        <h2 className="liked-heading" style={{textAlign:'center', paddingTop:'40px'}}>Liked Posts</h2>
        {likedImages.length === 0 ? (
          <p className="no-liked-posts">No liked posts to display.</p> // If no liked posts exist
        ) : (
          <div className="gallery-container">
            {likedImages.map((image) => (
              <div key={image.id} className="image-container">
                <img src={image.url} alt={image.name} className="image-item" />
                <p className="image-name">{image.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default LikedPage;
