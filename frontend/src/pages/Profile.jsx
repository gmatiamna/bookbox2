import React, { useState } from "react";
import {
  useGetProfileQuery,
  useGetUserPointsQuery,
  useUpdateProfilePhotoMutation,
} from "../slices/userApi";
import Nav from "../components/nav";
import avatarDefault from "../assets/avatar-def.webp";

function ProfileUploadPopup({ onClose, onUploadSuccess }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [updateProfilePhoto] = useUpdateProfilePhotoMutation();

  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg+xml",
    "image/x-icon",
    "image/gif",
    "image/webp",
  ];

  // Convert image file to Base64 string
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // reader.result is like "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
        // We want just the base64 part without the prefix
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert("Unsupported file format.");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Choose a file");

    try {
      setUploading(true);

      // Convert file to base64 string
      const base64Image = await toBase64(image);

      // Send JSON with image base64 and fileType
      const payload = {
        image: base64Image,
        fileType: image.type,
      };

      await updateProfilePhoto(payload).unwrap();

      alert("Photo updated successfully!");
      onUploadSuccess();
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-xl font-bold"
          aria-label="Close popup"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4 text-[#724521]">
          Upload Profile Photo
        </h3>
        <form onSubmit={handleUpload} className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#724521] file:text-white
            hover:file:bg-[#5a3515]
            cursor-pointer"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#724521]"
            />
          )}
          <button
            type="submit"
            disabled={uploading}
            className={`px-6 py-2 rounded-full text-white font-semibold transition ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#724521] hover:bg-[#5a3515]"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Profile() {
  const [preview, setPreview] = useState(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const { data: user, refetch, isLoading: loadingProfile } = useGetProfileQuery();
  const { data: pointsData, isLoading: loadingPoints } = useGetUserPointsQuery();

  if (loadingProfile || loadingPoints)
    return <div className="p-4 text-center">Loading...</div>;

  const {
    nom,
    email,
    d_ness,
    date_inscription,
    genre_prefere,
    photo_profil,
  } = user || {};

  const totalPoints = pointsData?.totalPoints || 0;

  return (
    <div>
      <Nav />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-20">
        <div className="flex items-center gap-4 relative group w-max">
          <img
            src={preview || photo_profil || avatarDefault}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = avatarDefault;
            }}
            alt={nom}
            className="w-16 h-16 rounded-full object-cover"
          />
          {/* Change overlay */}
          <div
            onClick={() => setShowUploadPopup(true)}
            className="absolute top-0 left-0 w-16 h-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer select-none"
          >
            Change
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#724521]">{nom}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{new Date(d_ness).toLocaleDateString()}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Joined</p>
            <p className="font-medium">{new Date(date_inscription).toLocaleDateString()}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Preferred Genres</p>
            <p className="font-medium">{genre_prefere?.join(", ") || "None selected"}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl shadow-sm border border-yellow-300">
            <p className="text-sm text-yellow-800">Points Balance</p>
            <p className="text-xl font-bold text-yellow-700">{totalPoints} pts</p>
          </div>
        </div>
      </div>

      {/* Upload popup */}
      {showUploadPopup && (
        <ProfileUploadPopup
          onClose={() => setShowUploadPopup(false)}
          onUploadSuccess={() => {
            refetch();
            setPreview(null);
          }}
        />
      )}
    </div>
  );
}

export default Profile;
