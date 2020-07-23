const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
  saved: {
    type: Boolean,
    default: false,
  },
});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
