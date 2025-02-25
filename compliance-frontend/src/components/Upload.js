import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await axios.post("https://compliance-backend-x0r6.onrender.com/upload", formData);
      alert("File uploaded! URL: " + res.data.url);
    } catch (error) {
      alert("Upload failed: " + error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Upload Compliance PDF</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
