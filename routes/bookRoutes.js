const router = require("express").Router();
const bookController = require("../../contollers/bookController");

router
  .route("/")
  .get(bookController.findAll)
  .post(bookController.saveBook);

router
  .route("/:id")
  .get(bookController.findById)
  .delete(bookController.deleteBook);

module.exports = router;
