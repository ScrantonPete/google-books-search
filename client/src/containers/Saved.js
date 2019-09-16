import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";

class Saved extends Component {
  state = {
    bookList: []
  };
  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    API.getSavedBooks()
      .then(res => this.setState({ booksList: res.data }))
      .catch(err => console.log(err));
  };

  deleteBook = Id => {
    API.deleteBook(Id)
      .then(this.getBooks)
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        {/* make jumbotron */}
        <div className="jumbotron jumbotron-fluid bg-dark text-light">
          <div className="container-fluid">
            <h1>View Saved</h1>
          </div>
        </div>
        {/* create row/columns */}
        <div className="container-fluid">
          <div className="row">
            {/* book results */}
            <div className="col-12">
              {!this.state.bookList.length ? (
                <h3 className="text-center">No Saved Books</h3>
              ) : (
                <React.Fragment>
                  <h3>Saved Books</h3>
                  <div className="row">
                    {this.state.booksList.map(book => {
                      return (
                        <div className="col-12 col-md-3" key={book._id}>
                          <div className="card">
                            <img
                              src={book.image}
                              alt={book.title}
                              className="card-img-top"
                            />
                            <div className="card-body">
                              <h5 className="card-title">{book.title}</h5>
                              <p className="card-text">Released: {book.date}</p>
                              {book.authors ? (
                                <p className="card-text">
                                  By: {book.authors.join(", ")}
                                </p>
                              ) : (
                                ""
                              )}
                              <p className="card-text">
                                <strong>Description</strong>: {book.description}{" "}
                              </p>

                              <a
                                href={book.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="btn btn-success btn-small"
                              >
                                See More...
                              </a>
                              <button
                                onClick={() => this.deleteBook(book._id)}
                                className="btn btn-dark btn-small"
                              >
                                Delete Book
                              </button>
                              <Link
                                to={`/saved/${book._id}`}
                                className="btn btn-block btn-danger"
                              >
                                {" "}
                                Book Info
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Saved;
