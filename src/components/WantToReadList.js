import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

// The WantToReadList component is responsible for displaying the user's reading list. It receives the list of books and the function to remove a book from the list as props. The component displays the list of books with a remove button for each book. If there are no books in the list, it displays a message indicating that no books have been added yet.

const WantToReadList = ({ books, onRemove }) => {
  return (
    <div className="mt-4">
      <h3>MyReading List</h3>
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
