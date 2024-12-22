import React, { useState } from "react";

function CreatePost() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file) => {
    const readAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Base64 string
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    const uploadFile = async () => {
      const base64 = await readAsBase64(file);
      setPreviewUrl(base64); // Set the preview URL for the image
    };

    uploadFile();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Ensure only one file is selected
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0]; // Only handle the first file
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    if (previewUrl) {
      const image = {
        id: new Date().getTime() + Math.random(),
        url: previewUrl,
      };

      const existingImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
      existingImages.push(image);
      localStorage.setItem("uploadedImages", JSON.stringify(existingImages));
      alert("Image uploaded successfully!");
      setPreviewUrl(null); // Reset preview after upload
    } else {
      alert("No image to upload!");
    }
  };

  return (
    <div className="create-post-container" style={{ position: "relative" }}>
   <div
  className={`drop-zone ${isDragging ? "dragging" : ""}`}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  style={{
    border: "2px dashed #ccc",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed", // Fixed position for centering
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Offset to truly center
    backgroundColor: isDragging ? "#f9f9f9" : "transparent", // Optional dragging effect
    zIndex: 1,
  }}
>

  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    style={{ display: "none" }}
    id="file-input"
  />
  <label htmlFor="file-input" style={{ cursor: "pointer" }}>
    <p>Drag and drop an image here or click to select</p>
  </label>
</div>


{previewUrl && (
  <div
    className="preview-container"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed", // Fixed to center on the screen
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional dimmed background
      zIndex: 2,
    }}
  >
    <span
      className="close-button"
      onClick={() => setPreviewUrl(null)} // Reset the preview URL to close the preview
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "#ff4d4d", // Red background for visibility
        color: "#fff",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      X
    </span>
    <img
      src={previewUrl}
      alt="Preview"
      style={{
        maxWidth: "90vw", // Ensure it fits within the viewport width
        maxHeight: "90vh", // Ensure it fits within the viewport height
        objectFit: "contain", // Maintain aspect ratio
        border: "1px solid #ccc",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    />
    <button
      onClick={handleUploadClick}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Upload
    </button>
  </div>
)}
   </div>
  );
}

export default CreatePost;
