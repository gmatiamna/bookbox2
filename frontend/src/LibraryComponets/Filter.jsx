import React from "react";
import PropTypes from "prop-types";
import Star from "../components/StarRate";

const FilterPanel = ({ genres, authors, filters, setFilters,  }) => {
  const handleRatingFilter = (stars) => {
    setFilters({ ...filters, noteMin: stars });
  };

  const handleGenreClick = (genreName) => {
    setFilters({ ...filters, categorie: genreName === filters.categorie ? "" : genreName });
  };

  const handleAuthorToggle = (author) => {
    const current = filters.auteur ? filters.auteur.split(",") : [];
    const updated = current.includes(author)
      ? current.filter((a) => a !== author)
      : [...current, author];
    setFilters({ ...filters, auteur: updated.join(",") });
  };

  const handleReset = () => {
    setFilters({
      categorie: "",
      prixMin: 0,
      prixMax: 100,
      noteMin: 0,
      auteur: "",
    });
  };

  const selectedAuthors = filters.auteur ? filters.auteur.split(",") : [];

  return (
    <div className="  w-[100%]">
 
    <div  className="grid gap-3">
      {/* Genre List */}
      <div className="  rounded-[16px] bg-white border border-slate-100 p-3">
      <h3 className="text-[#C5922D] font-[Zain] ml-10 font-bold text-[24px] leading-[24px] tracking-[0px] mb-2">
  Categories
</h3>
        <div className="grid mr-10 gap-3">
          {genres.map((genre) => (
            <button
              key={genre.name}
              className={`font-[Zain] font-400 text-[20px] leading-[20px] ${
                filters.categorie === genre.name
                  ? "text-[#9FB11D]"
                  : "text-black"
              }`}
              onClick={() => handleGenreClick(genre.name)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="  rounded-[16px] bg-white border border-slate-100 p-3">
        <h3 className="text-[#C5922D] font-[Zain] font-bold text-[24px] leading-[24px] tracking-[0px] mb-2">Price Range</h3>
        <input
  type="range"
  min="0"
  max="100"
  value={filters.prixMax}
  onChange={(e) =>
    setFilters({ ...filters, prixMax: Number(e.target.value) })
  }
  className="w-full accent-[#9FB11D]" // Changes the thumb and track to your gold color
/>
        <p className="text-sm text-gray-500 mt-1">Max: ${filters.prixMax}</p>
      </div>

      {/* Rating */}
      <div className="  rounded-[16px] bg-white border border-slate-100 p-3">
        <h3 className="text-[#C5922D] font-[Zain] ml-10 font-bold text-[24px] leading-[24px] tracking-[0px] mb-2">Rating</h3>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={25}
              fill={i <= filters.noteMin ? "#facc15" : "#e5e7eb"}
              onClick={() => handleRatingFilter(i)}
            />
          ))}
        </div>
      </div>

      {/* Author Checklist */}
      <div className="  rounded-[16px] bg-white border border-slate-100 p-3">
        <h3 className="text-[#C5922D] font-[Zain] ml-10 font-bold text-[24px] leading-[24px] tracking-[0px] mb-2">Authors</h3>
        <div className="space-y-1">
          {authors.map((author) => (
            <label key={author} className="flex items-center space-x-2">
              <input
  type="checkbox"
  checked={selectedAuthors.includes(author)}
  onChange={() => handleAuthorToggle(author)}
  className="scale-125 accent-[#9FB11D]" // Makes checkbox 25% bigger and gold-colored
/>
              <span>{author}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-4">
       
        <button
          onClick={handleReset}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded"
        >
          Reset Filters
        </button>
      </div>
    </div>
    </div>
  );
};

FilterPanel.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.shape({
    categorie: PropTypes.string,
    prixMin: PropTypes.number,
    prixMax: PropTypes.number,
    noteMin: PropTypes.number,
    auteur: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
 
};

export default FilterPanel;
