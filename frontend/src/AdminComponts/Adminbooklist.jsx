import React from "react";
import { useGetBooksQuery, useDeleteBookMutation } from "../slices/bookApi";
import { useNavigate } from "react-router-dom";

const AdminBooksList = () => {
  const { data: books = [], isLoading, error } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id).unwrap();
        alert("Book deleted successfully");
      } catch (err) {
        alert("Failed to delete");
        console.error(err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-book/${id}`);
  };

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">📚 Manage Books</h1>
      <table className="w-full border shadow-md">
        <thead className="bg-[#f0f0f0]">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Author</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-t">
              <td className="p-2">{book.titre}</td>
              <td className="p-2">{book.auteur}</td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEdit(book._id)}
                >
                  Modify
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooksList;
