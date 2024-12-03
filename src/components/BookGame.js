import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import Scoreboard from './Scoreboard';

const BookGame = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [options, setOptions] = useState([]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // The fetchBooks function is responsible for retrieving book data from the Open Library API, processing it, and handling potential errors.
  const fetchBooks = () => {
    const url = `https://openlibrary.org/search.json?q=fantasy`;
    setLoading(true);

    // Fetch book data from the Open Library API

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Raw data fetched from API:", data);

        // Process the fetched data and extract relevant information
        const books = data.docs.map((book) => ({
          title: book.title,
          author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
          description: book.first_publish_year
            ? book.first_publish_year.toString()
            : "No publish year available",
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "No cover available",
        }));
        // Cache the processed book data in localStorage

        localStorage.setItem("books", JSON.stringify(books));
        setLoading(false);
        return books;
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
        return [];
      });
  };

  // handleAnswer is a callback function that is triggered when a user selects an answer in the game
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    startRound(books);
  };

  // Reset the game to its initial state
  const resetGame = () => {
    setRound(0);
    setScore(0);
    setGameOver(false);

    // Use cached books if available
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      const parsedBooks = JSON.parse(storedBooks);
      setBooks(parsedBooks);
      startRound(parsedBooks);
    } else {
      // Fetch new data if no cached books
      fetchBooks().then((fetchedBooks) => {
        setBooks(fetchedBooks);
        if (fetchedBooks.length > 0) {
          startRound(fetchedBooks);
        }
      });
    }
  };

  // Start a new round with a random book and options
  // The startRound function selects a random book from the list of books and generates two incorrect options.
  const startRound = (books) => {
    if (round >= 10) {
      setGameOver(true);
      return;
    }

    // Select a random book as the correct answer
    const correctBook = books[Math.floor(Math.random() * books.length)];

    // Filter out the correct book to get incorrect options
    const incorrectBooks = books.filter((book) => book.title !== correctBook.title);

    // Randomly select two incorrect options
    const randomIncorrectBooks = incorrectBooks
      .sort(() => Math.random() - 0.5) // Shuffle incorrectBooks
      .slice(0, 2) // Take the first two as incorrect options
      .map((book) => book.description); // Extract descriptions

    // Combine correct and incorrect options and shuffle them
    const options = [...randomIncorrectBooks, correctBook.description].sort(() => Math.random() - 0.5);

    setOptions(options); // Update options in state
    setCurrentBook(correctBook); // Update the current book in state
    setRound(round + 1); // Increment the round counter
  };


  // Effect to fetch books or load from localStorage
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");

    if (storedBooks) {
      const parsedBooks = JSON.parse(storedBooks);
      setBooks(parsedBooks);
      startRound(parsedBooks);
      setLoading(false); // Stop loading if books are loaded from localStorage
    } else {
      fetchBooks("subject:fiction").then((fetchedBooks) => {
        if (fetchedBooks.length > 0) {
          setBooks(fetchedBooks);
          startRound(fetchedBooks);
        }
      });
    }
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <h2>Loading...</h2>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {gameOver ? (
            <div>
              <h2>Game Over</h2>
              <p>Your final score is: {score}</p>
              <button className="btn btn-primary mt-3" onClick={resetGame}>
                Play Again!
              </button>
            </div>
          ) : (
            <>
              <Scoreboard
                round={round}
                totalRounds={10}
                score={score}
                />
              <QuestionCard
                book={currentBook}
                options={options}
                onAnswer={(isCorrect) => handleAnswer(isCorrect)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BookGame;
