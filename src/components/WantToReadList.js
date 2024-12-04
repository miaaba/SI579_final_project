import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

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
