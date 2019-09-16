import React, { Component } from "react";
import API from "../utils/API";

class Search extends Component {
  state = {
    searchTerm: "",
    bookList: []
  };

  searchGoogleBooks = bookQuery => {
    API.searchGoogleBooks(bookQuery)
      .then(res => {
        const bookList = res.data.items.map(book => {
          return {
            Id: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            date: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks,
            link: book.volumeInfo.infoLink
          };
        });
        // set state to have new book list
        this.setState({ bookList });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.searchTerm) {
      return false;
    }

    this.searchGoogleBooks(this.state.searchTerm);
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  saveBook = Id => {
    // find book based on the Id value
    const bookPicked = this.state.bookList.find(book => book.Id === Id);
    console.log(bookPicked);
    API.saveBook(bookPicked)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {/* make jumbotron */}
        <div className="jumbotron jumbotron-fluid bg-dark text-light">
          <div className="container-fluid">
            <h1>Search For Books</h1>
          </div>
        </div>
        {/* create row with two columns */}
        <div className="container-fluid">
          <div className="row">
            {/* form section */}
            <div className="col-12 col-sm-6 col-md-3">
              <h3>Search Below</h3>
              <form onSubmit={this.handleFormSubmit}>
                <input
                  name="searchTerm"
                  onChange={this.handleInputChange}
                  placeholder="Enter book name here"
                  value={this.state.searchTerm}
                  type="input"
                  className="form-control mb-3"
                />
                <button
                  className="btn btn-block btn-success"
                  onClick={this.handleFormSubmit}
                >
                  Search Google
                </button>
              </form>
            </div>
            {/* end form section */}
            {/* begin book result section */}
            <div className="col-12 col-sm-6 col-md-9">
              {!this.state.bookList.length ? (
                <h2 className="text-center">Book Results</h2>
              ) : (
                <React.Fragment>
                  <h3>Search Results for: {this.state.searchTerm}</h3>
                  <div className="row">
                    {this.state.bookList.map(book => {
                      return (
                        <div className="col-12 col-md-6" key={book.Id}>
                          <div className="card">
                            <img
                              src={book.image}
                              alt={book.title}
                              className="card-img-top"
                            />
                            <div className="card-body">
                              <h5 className="card-title">{book.title}</h5>
                              <p className="card-text">
                                Release Year: {book.date}
                              </p>
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
                                onClick={() => this.saveBook(book.Id)}
                                className="btn btn-dark btn-small"
                              >
                                Save
                              </button>
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

export default Search;
