import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

/**
 * The WantToReadList component displays a list of books that the user wants to read.
 * Each book in the list shows its title, author, and a remove button.
 * If the list is empty, a placeholder message is displayed.
 *
 * @param {Object} props - The component props.
 * @param {Array<{title: string, author: string}>} props.books - The list of books to display, each containing a title and an author.
 * @param {Function} props.onRemove - The callback function triggered when a book is removed.
 * Accepts the title of the book to remove as its parameter.
 *
 * @returns {JSX.Element} A list of books with a remove button for each.
 */
const WantToReadList = ({ books, onRemove }) => {
  return (
    <div className="mt-4">
      <h3>My Reading List</h3>
      <p className="text-muted">See a book that sounds intresting? Click the "I want to read this book!" button to create your reading list!</p>
      <ListGroup>
        {books.length === 0 ? (
          <ListGroup.Item>No books added yet!</ListGroup.Item>
        ) : (
          books.map((book, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{book.title}</strong> by {book.author}
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onRemove(book.title)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </div>
  );
};

export default WantToReadList;
