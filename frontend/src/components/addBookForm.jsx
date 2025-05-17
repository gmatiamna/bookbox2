import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const AddBookForm = (props) => {
  const [categories, setCategories] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    rentPrice: "",
    category: "",
    description: "",
  });

  const [img, setImg] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books/getGenres');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (formData.title.length < 2 || formData.title.length > 50) {
      errors.title = "Title must be between 2 and 50 characters";
    }
    if (formData.author.length < 2 || formData.author.length > 50) {
      errors.author = "Author must be between 2 and 50 characters";
    }
    if (formData.description.length < 10 || formData.description.length > 400) {
      errors.description = "Description must be between 10 and 400 characters";
    }
    if (isNaN(formData.price) || formData.price === "") {
      errors.price = "Price must be a valid number";
    }
    if (isNaN(formData.rentPrice) || formData.rentPrice === "") {
      errors.rentPrice = "Rent Price must be a valid number";
    }
    if (!formData.category) {
      errors.category = "Category must be selected";
    }
    if (!img) {
      errors.imageBook = "Cover image must be uploaded";
    }
    if (!pdfFile) {
      errors.pdfFile = "PDF file must be uploaded";
    }
    return errors;
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const saveData = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const toastId = toast.loading("Saving Your Book...");

    const formDataToSend = new FormData();
    formDataToSend.append("titre", formData.title);
    formDataToSend.append("auteur", formData.author);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("prix_achat", formData.price);
    formDataToSend.append("prix_location", formData.rentPrice);
    formDataToSend.append("categorie", formData.category);
    formDataToSend.append("userId", userId);
    formDataToSend.append("image", img);
    formDataToSend.append("pdf", pdfFile);

    try {
      const response = await fetch("http://localhost:5000/api/books/createBook", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.update(toastId, {
          render: "Your New Book has been saved successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        props.onAjout(responseData.book);
        props.onClose();
      } else {
        throw new Error(responseData.message || "Failed to add book");
      }
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "An error occurred!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="book-form-container">
      <div className="book-signin-header">Add Book</div>
      <img
        src="elements/X.svg"
        alt="Close"
        className="close-iconflw_book"
        onClick={props.onClose}
        style={{ cursor: "pointer" }}
      />
      <div className="book-signin-step">
        <p>Title</p>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
        />
        {formErrors.title && <p className="error-text">{formErrors.title}</p>}

        <p>Author</p>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
        />
        {formErrors.author && <p className="error-text">{formErrors.author}</p>}

        <p>Price</p>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        {formErrors.price && <p className="error-text">{formErrors.price}</p>}

        <p>Rent Price</p>
        <input
          type="text"
          name="rentPrice"
          value={formData.rentPrice}
          onChange={handleChange}
          placeholder="Rent Price"
        />
        {formErrors.rentPrice && <p className="error-text">{formErrors.rentPrice}</p>}

        <p>Category</p>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="" disabled>Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {formErrors.category && <p className="error-text">{formErrors.category}</p>}

        <p>Description</p>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the book"
        />
        {formErrors.description && <p className="error-text">{formErrors.description}</p>}

        {/* Image Upload */}
        <label className="image-uploader">
          <input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
          {img && <img className="image-uploader" src={URL.createObjectURL(img)} alt="Cover" />}
        </label>
        {formErrors.imageBook && <p className="error-text">{formErrors.imageBook}</p>}

        {/* PDF Upload */}
        <div className="pdf-upload">
          <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
        </div>
        {formErrors.pdfFile && <p className="error-text">{formErrors.pdfFile}</p>}

        {/* Submit */}
        <div className="book-signin-button-container">
          <button className="book-signin-button book-signin-next" onClick={saveData}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

AddBookForm.propTypes = {
  onAjout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddBookForm;
