import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useGetGenresQuery,
} from "../slices/bookApi";

const EditBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useGetBookByIdQuery(id);
  const { data: genres = [] } = useGetGenresQuery();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [form, setForm] = useState({
    titre: "",
    auteur: "",
    categorie: [],
    prix_achat: "",
    prix_location: "",
    description: "",
    remise: "", // New discount field
  });

  useEffect(() => {
    if (book) {
      setForm({
        titre: book.titre || "",
        auteur: book.auteur || "",
        categorie: book.categorie || [],
        prix_achat: book.prix_achat || "",
        prix_location: book.prix_location || "",
        description: book.description || "",
        remise: book.remise || "", // Initialize if exists
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenresChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, categorie: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...form,
    };

    // Optionally remove remise if empty
    if (!form.remise) {
      delete updatedData.remise;
    }

    try {
      await updateBook({ id, updatedData }).unwrap();
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (isLoading) return <p>Loading book...</p>;
  if (isError) return <p>Failed to load book.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-semibold text-[#40879A] mb-4">✏️ Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titre"
          value={form.titre}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="auteur"
          value={form.auteur}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="categorie"
          multiple
          value={form.categorie}
          onChange={handleGenresChange}
          className="w-full border p-2 rounded h-32"
        >
          {genres.map((genre) => (
            <option key={genre._id || genre.name} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="prix_achat"
          value={form.prix_achat}
          onChange={handleChange}
          placeholder="Buy Price"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="prix_location"
          value={form.prix_location}
          onChange={handleChange}
          placeholder="Rent Price"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        {/* Optional Discount Field */}
        <input
          type="number"
          name="remise"
          value={form.remise}
          onChange={handleChange}
          placeholder="Discount % (optional)"
          className="w-full border p-2 rounded"
          min="0"
          max="100"
        />

        <button
          type="submit"
          className="bg-[#40879A] hover:bg-[#327180] text-white px-6 py-2 rounded"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
