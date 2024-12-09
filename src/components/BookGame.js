import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import Scoreboard from './Scoreboard';
import WantToReadList from './WantToReadList';
import { franc } from 'franc-min';

 /**
  * The BookGame component is responsible for managing the game state, including the current book, options, round, score, and game over status. It also handles the user's answers and the "Want to Read" list. The component fetches books from the Open Library API, processes them, and stores them in localStorage for caching. The component also includes the QuestionCard, Scoreboard, and WantToReadList components to display the game elements. The BookGame component is the main component that orchestrates the game logic and user interactions.
  *
  * @returns {JSX.Element} The BookGame component.
  */

const BookGame = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [options, setOptions] = useState([]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [wantToRead, setWantToRead] = useState([]);

  // The detectLanguage function uses the franc library to detect the language of a given text. In this case it checks if the text is in English. This is used later in fetchBooks to filter out non-English books.
  const detectLanguage = (text) => {
    const language = franc(text);
    return language === 'eng';
  };

  // The fetchBooks function is responsible for retrieving book data from the Open Library API, processing it, and handling potential errors. It also filters out non-English books using the detectLanguage function and filters books that have the first_sentence data. The fetched books are stored in localStorage for caching. The function returns an array of simplified book objects with title, author, description, and cover image.
  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://openlibrary.org/search.json?q=fiction");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      // Filter out non-English books and books without a first sentence
      const englishBooks = data.docs.filter(
        (book) =>
          book.first_sentence &&
          book.first_sentence.length > 0 &&
          detectLanguage(book.first_sentence[0])
      );

      // Map the fetched books to a simplified format. This includes the title, author, description, and cover image. If the author is not available, it defaults to "Unknown Author". If the cover image is not available, it defaults to "No cover available". The cover image is fetched by using the cover_i ID and then put into OpenLibrary's Cover API resulting in the correct book cover. The description is limited to the first 10 words of the first sentence. If the sentence is longer than 10 words, it is truncated and an ellipsis is added. If shorter, it is left as is.
      const books = englishBooks.map((book) => ({
        title: book.title,
        author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
        description: `${book.first_sentence[0]
          .split(" ")
          .slice(0, 10)
          .join(" ")}${book.first_sentence[0].split(" ").length > 10 ? "..." : ""}`,
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "No cover available",
      }));

      localStorage.setItem("books", JSON.stringify(books));

      setLoading(false);

      return books;
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
      return [];
    }
  };

  // Effect to fetch books or load from localStorage. This effect runs once when the component is mounted. It checks if there are cached books in localStorage and loads them if available. If not, it fetches new books using the fetchBooks function. The effect also starts a new round with the fetched books. The empty dependency array [] ensures that the effect runs only once when the component is mounted.
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      const parsedBooks = JSON.parse(storedBooks);
      setBooks(parsedBooks);
      startRound(parsedBooks);
      setLoading(false);
    } else {
      fetchBooks().then((fetchedBooks) => {
        if (fetchedBooks.length > 0) {
          setBooks(fetchedBooks);
          startRound(fetchedBooks);
        }
      });
    }
  }, []);


  // Add a book to the "Want to Read" list. This function is called when the user clicks the "I want to read this book!" button in the game. It checks to see if a book alrady exists on the list and alerts the user when the book is already there. It adds the selected book to the wantToRead state and stores it in localStorage. It also displays an alert to confirm that the book has been added to the reading list.
  const addToWantToRead = (book) => {
    const bookExists = wantToRead.some((b) => b.title === book.title);
    if (bookExists) {
      alert("This book is already in your reading list!");
      return;
    }

    const updatedList = [...wantToRead, book];
    setWantToRead(updatedList);
    localStorage.setItem("want-to-read", JSON.stringify(updatedList));

    alert("Book added to your reading list!");
  };


  // Remove a book from the "Want to Read" list. This function is called when the user clicks the "Remove" button next to a book in the "Want to Read" list. It filters out the book to be removed and updates the wantToRead state and localStorage.
  const removeFromWantToRead = (title) => {
    const updatedList = wantToRead.filter((book) => book.title !== title);
    setWantToRead(updatedList);
    localStorage.setItem("want-to-read", JSON.stringify(updatedList));
  };

  // handleAnswer is a callback function that is triggered when a user selects an answer in the game. It checks if the answer is correct and updates the score accordingly. It then starts a new round with a new book and options.
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    startRound(books);
  };

  // Reset the game to its initial state. This function is called when the user clicks the "Play Again!" button after the game is over. It resets the round counter, score, and game over state. It then fetches new books or loads cached books and starts a new round.
  const resetGame = () => {
    setRound(0);
    setScore(0);
    setGameOver(false);

    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      const parsedBooks = JSON.parse(storedBooks);
      setBooks(parsedBooks);
      startRound(parsedBooks);
    } else {
      fetchBooks().then((fetchedBooks) => {
        setBooks(fetchedBooks);
        if (fetchedBooks.length > 0) {
          startRound(fetchedBooks);
        }
      });
    }
  };

  // Start a new round with a random book and options. This function is called at the beginning of the game and after each round. It selects a random book as the correct answer and two random incorrect options. It then shuffles the options and updates the current book, options, and round in the state. If the round reaches 10, the game is over.
  const startRound = (books) => {
    if (round >= 10) {
      setGameOver(true);
      return;
    }

    // Select a random book as the correct answer.
    const correctBook = books[Math.floor(Math.random() * books.length)];

    // Filter out the correct book to get incorrect options
    const incorrectBooks = books.filter((book) => book.title !== correctBook.title);

    // Randomly select two incorrect options. Shuffle the incorrect books and take the first two. Then extract the descriptions.
    const randomIncorrectBooks = incorrectBooks
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((book) => book.description);

    // Combine correct and incorrect options and shuffle them
    const options = [...randomIncorrectBooks, correctBook.description].sort(() => Math.random() - 0.5);

    setOptions(options);
    setCurrentBook(correctBook);
    setRound(round + 1);
  };

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
              <Scoreboard round={round} totalRounds={10} score={score} />
              <QuestionCard
                book={currentBook}
                options={options}
                onAnswer={(isCorrect) => handleAnswer(isCorrect)}
                onAddToWantToRead={addToWantToRead}
              />
            </>
          )}
        </>
      )}
        <WantToReadList
          books={wantToRead}
          onRemove={removeFromWantToRead}
        />
    </div>
  );
};

export default BookGame;
