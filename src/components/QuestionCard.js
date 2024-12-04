import React from "react";

// The QuestionCard component is responsible for displaying the book title, author, cover image, and answer options.

// It also handles the user's selection of an answer and triggers the onAnswer callback function to determine if the answer is correct.

const QuestionCard = ({ book, options, onAnswer, onAddToWantToRead }) => {
  const handleOptionClick = (option) => {
    const isCorrect = option === book.description;
    onAnswer(isCorrect);
  };

  return (
    <div className="card text-center mb-4 p-3">
      <h2 className="card-title">{book.title}</h2>
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        className="card-img-top mx-auto mb-3"
        style={{ width: "150px", height: "200px" }}
      />
      <p className="card-text mb-3">By: {book.author}</p>
      <div className="d-flex flex-row justify-content-around align-items-center w-100">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="btn btn-primary mx-2"
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="btn btn-secondary mt-3"
        onClick={() => onAddToWantToRead(book)} // Call the function with the current book
      >
        I want to read this book!
      </button>
    </div>
  );
};

export default QuestionCard;

