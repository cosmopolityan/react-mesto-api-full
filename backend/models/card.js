const mongoose = require('mongoose');

const stringLength = {
  type: String,
  minlength: 2,
  maxlength: 30,
};

const refUserId = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user',
};

const validate = require('../utils/validate');

const cardSchema = new mongoose.Schema(
  {
    name: {
      ...stringLength,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validator: validate.URL,
    },
    owner: {
      ...refUserId,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
