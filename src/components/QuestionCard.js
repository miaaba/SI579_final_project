import React from "react";

/**
 * The QuestionCard component is responsible for displaying the current book and the options to choose from. It receives the current book, the options, and the functions to handle the answer and adding the book to the reading list as props. The handleOptionClick function is called when an option is clicked and checks if the selected option is correct. The QuestionCard component also includes a button to add the current book to the reading list.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.book - The book object containing title, author, cover, and description.
 * @param {Array<string>} props.options - The options to choose from.
 * @param {Function} props.onAnswer - The callback function triggered when an option is selected. Accepts a boolean parameter indicating if the option is correct.
 * @param {Function} props.onAddToWantToRead - The callback function triggered when the "I want to read this book!" button is clicked. Accepts the book object as its parameter.
 *
 * @returns {JSX.Element} A card displaying the book, options, and a button to add the book to the reading list.
 *
 */

const QuestionCard = ({ book, options, onAnswer, onAddToWantToRead }) => {

  // The handleOptionClick function is called when an option is clicked and checks if the selected option is correct. It calls the onAnswer function with a boolean value indicating whether the selected option is correct. The onAnswer function is passed as a prop to the QuestionCard component from the parent component (BookGame).
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
        {/* Map over the options and display them as buttons. When a button is clicked, call the handleOptionClick function with the selected option. */}
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
      // A button to add the current book to the reading list. When the button is clicked, call the onAddToWantToRead function with the current book as an argument. The onAddToWantToRead function is passed as a prop to the QuestionCard component from the parent component (BookGame).
        className="btn btn-success mt-3 align-self-center"
        style={{ width: 200 }}
        onClick={() => onAddToWantToRead(book)}
      >
        I want to read this book!
      </button>
    </div>
  );
};

export default QuestionCard;

