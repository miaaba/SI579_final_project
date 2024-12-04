import React from "react";
import BookGame from "./components/BookGame";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <header className=" text-center bg-primary text-white py-3">
        <h1 className="display-4">Book Matching Game!</h1>
      </header>
      <main className="container my-4">
        <h2 className="text-center">Can you match the book to its publication date?</h2>
        <p className="text-center text-muted">Select the year the book was published</p>
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
