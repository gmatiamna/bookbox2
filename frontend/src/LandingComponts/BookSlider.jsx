// BooksSlider.jsx
import React, { useState, useRef, useEffect } from "react";
import { useGetBooksQuery } from "../slices/bookApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BooksSlider = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  useEffect(() => {
    if (books && books.length > 0) {
      const firstBook = document.querySelector(`.book-item-${books[0]._id}`);
      if (firstBook) {
        firstBook.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      }
    }
  }, [books]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const deltaX = e.clientX - startX;
    sliderRef.current.scrollLeft -= deltaX;
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateCurrentCenterIndex = () => {
      const children = Array.from(slider.children);
      const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - childCenter);
        if (distance < minDistance) {
          closestIndex = index;
          minDistance = distance;
        }
      });

      setCurrentCenterIndex(closestIndex);
    };

    updateCurrentCenterIndex();
    slider.addEventListener("scroll", updateCurrentCenterIndex);
    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mouseleave", handleMouseUp);

    return () => {
      slider.removeEventListener("scroll", updateCurrentCenterIndex);
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startX]);

  return (
    <div className="transition-all duration-500 ease-in-out max-h-[800px] opacity-100 overflow-hidden bg-[#9FB11D] px-6 py-6 relative rounded-b-xl">
      <h2 className="text-2xl font-bold text-white mb-2 text-center font-zain">A Peek Into the Library</h2>
      <p className="text-white text-center mb-6">
        From timeless classics to trending titles, explore a handpicked glimpse of our vast collection.<br/> Start discovering what’s waiting for you.
      </p>

      {isLoading ? (
        <p className="text-white text-center">Loading books...</p>
      ) : isError ? (
        <p className="text-red-200 text-center">Failed to load books</p>
      ) : (
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex space-x-0 overflow-x-auto px-2 w-full cursor-grab scrollbar-hide"
            style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
          >
            {books.map((book, index) => {
              const distance = Math.abs(index - currentCenterIndex);

              let width = 160;
              let height = 200;
              let scale = 0.8;
              let rotate = 0;
              let showInfo = false;
              let marginX = 10;

              if (distance === 0) {
                width = 200;
                height = 250;
                scale = 1;
                rotate = 0;
                showInfo = true;
                marginX = 20;
              } else if (distance === 1) {
                width = 180;
                height = 225;
                scale = 0.9;
                rotate = index < currentCenterIndex ? -5 : 5;
                marginX = 15;
              } else if (distance === 2) {
                width = 160;
                height = 200;
                scale = 0.8;
                rotate = index < currentCenterIndex ? -8 : 8;
                marginX = 10;
              } else {
                width = 140;
                height = 180;
                scale = 0.7;
                rotate = 0;
                marginX = 5;
              }

              return (
                <div
                  key={book._id}
                  className={`book-item-${book._id} flex-shrink-0 transform transition-all duration-300`}
                  style={{
                    scrollSnapAlign: "center",
                    userSelect: isDragging ? "none" : "auto",
                    width: `${width}px`,
                    height: `${height + (showInfo ? 60 : 20)}px`,
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                    margin: `0 ${marginX}px`,
                    position: "relative",
                    cursor: "pointer",
                    filter: distance > 2 ? "grayscale(60%)" : "none",
                    opacity: distance > 3 ? 0.5 : 1,
                  }}
                >
                  <img
                    src={book.imageCouverture}
                    alt={book.titre}
                    className="object-cover rounded-md w-full"
                    style={{ height: `${height}px` }}
                  />
                  {showInfo && (
                    <div className="text-center mt-2">
                      <h3 className="font-zain text-[20px] text-white">{book.titre}</h3>
                      <p className="font-zain font-bold text-[16px] text-[#724521]">{book.prix_achat.toFixed(2)} DT</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {books.length > 0 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/20 text-white rounded-full p-2 z-10"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/20 text-white rounded-full p-2 z-10"
                aria-label="Scroll Right"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksSlider;
