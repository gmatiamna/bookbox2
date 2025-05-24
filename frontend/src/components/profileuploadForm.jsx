import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ProfileUploadForm() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const { userInfo } = useSelector((state) => state.auth); // ✅ get token
  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg+xml",
    "image/x-icon",
    "image/gif",
    "image/webp",
  ];

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        alert("Unsupported file format.");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Choose a file");

    const formData = new FormData();
    formData.append("photo", image); // ✅ this must match multer field in backend

    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/update-profile-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`, // ✅ send the JWT token
          },
        }
      );
      console.log("Server response:", res.data);
      alert("Photo updated successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleChange} />
        {preview && <img src={preview} alt="preview" width={100} />}
        <button type="submit">Upload Photo</button>
      </form>
    </div>
  );
}

export default ProfileUploadForm;
