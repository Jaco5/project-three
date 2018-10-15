const router = require("express").Router();
const entryRoutes = require("./entrys");

// Book routes
router.use("/entry", entryRoutes);

module.exports = router;
