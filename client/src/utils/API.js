import axios from "axios";

export default {
  getSavedBooks() {
    return axios.get("/api/books");
  },
  getBookById(Id) {
    return axios.get(`/api/books/${Id}`);
  },
  savedBook(bookData) {
    return axios.post("/api/books", bookData);
  },
  deleteBook(Id) {
    return axios.delete(`/api/books./${Id}`);
  },
  searchGoogleBooks(bookQuery) {
    return axios.get("https://googleapis.com/books/v1/volumes", {
      params: {
        q: bookQuery
      }
    });
  }
};
