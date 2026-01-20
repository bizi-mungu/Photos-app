import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "https://boringapi.com/api/v1/photos?limit=20"
        );
  
        setPhotos(response.data.photos);
      } catch (error) {
        setError("Failed to load photos");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPhotos();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading photos...</h2>;
  }

  if (error) {
    return (
      <h2 style={{ textAlign: "center", color: "red" }}>
        {error}
      </h2>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Photo Gallery</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "15px",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={photo.thumbnailUrl || photo.url}
              alt={photo.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              {photo.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
