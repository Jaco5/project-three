const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  title: { type: String, required: true },
  href: { type: String, required: true },
  
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
