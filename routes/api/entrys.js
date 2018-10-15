const router = require("express").Router();
const entrysController = require("../../controllers/entrysController");

// Matches with "/api/books"
router.route("/")
  .get(entrysController.findAll)
  .post(entrysController.create);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(entrysController.findById)
//   .put(entrysController.update)
//   .delete(entrysController.remove);

module.exports = router;
