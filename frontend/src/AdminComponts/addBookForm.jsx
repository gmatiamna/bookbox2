import React, { useState } from "react";
import { useAddBookMutation, useGetGenresQuery } from "../slices/bookApi";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();
  const { data: genres = [], isLoading: genresLoading, isError: genresError } = useGetGenresQuery();

  const [form, setForm] = useState({
    titre: "",
    auteur: "",
    categorie: [],
    prix_achat: "",
    prix_location: "",
    description: "",
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [couverture, setCouverture] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenresChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm({ ...form, categorie: selectedGenres });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!pdfFile || !couverture) {
      setError("Please upload both a PDF and a cover image.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, key === "categorie" ? JSON.stringify(value) : value);
      });

      formData.append("pdf", pdfFile);       // ✔ Multer expects `pdf`
      formData.append("image", couverture);  // ✔ Multer expects `image`

      // console.log("Submitting form:", [...formData.entries()]);
      await addBook(formData).unwrap();

      setSuccess("Book added successfully!");
      setTimeout(() => navigate("/admin/dashboard"), 2000);
    } catch (err) {
      console.error("Add book error:", err);
      setError("Failed to add book.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-3xl font-bold text-[#40879A] mb-6 text-center">
        Add New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="titre"
          value={form.titre}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        />

        <input
          type="text"
          name="auteur"
          value={form.auteur}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        />

        <select
          name="categorie"
          multiple
          value={form.categorie}
          onChange={handleGenresChange}
          className="w-full border border-gray-300 p-3 rounded-md h-32"
          required
        >
          {genresLoading && <option disabled>Loading genres...</option>}
          {genresError && <option disabled>Error loading genres</option>}
          {!genresLoading && !genresError && genres.length === 0 && (
            <option disabled>No genres found</option>
          )}
          {!genresLoading &&
            !genresError &&
            genres.map((genre) => (
              <option key={genre.name} value={genre.name}>
                {genre.name}
              </option>
            ))}
        </select>

        <input
          type="number"
          name="prix_achat"
          value={form.prix_achat}
          onChange={handleChange}
          placeholder="Price to Buy"
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        />

        <input
          type="number"
          name="prix_location"
          value={form.prix_location}
          onChange={handleChange}
          placeholder="Price to Rent"
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Book Description"
          rows={4}
          className="w-full border border-gray-300 p-3 rounded-md"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Upload PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCouverture(e.target.files[0])}
              required
            />
          </div>
        </div>

        {error && <p className="text-red-600 italic">{error}</p>}
        {success && <p className="text-green-600 font-semibold">{success}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#9FB11D] hover:bg-[#7C9715] text-white font-semibold py-3 rounded-md transition-all duration-300"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
