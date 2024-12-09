import React from "react";
import BookGame from "./components/BookGame";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * The App component is the main component that renders the header, BookGame component, and footer. It is the top-level component of the application.
 *
 * @returns {JSX.Element}- The App component.
 */

function App() {
  return (
    <div className="App">
      <header className=" text-center bg-primary text-white py-3">
        <h1 className="display-4">📚 Book Matching Game! 📚</h1>
      </header>
      <main className="container my-4">
        <h2 className="text-center">Can you match the book to the first 10 words of the first sentence?</h2>
        <p className="text-center text-muted">Select the matching sentence to the book</p>
        <hr />
        <BookGame />
      </main>
      <footer className="App-footer text-center bg-light py-3">
        <p className="text-muted">Made by Mia Abate for SI 579 Final Project</p>
      </footer>
    </div>
  );
};

export default App;
