// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const { ObjectId } = require('mongoose').Schema.Types;

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    emailType: { type: String },
    phone: { type: String },
    phoneType: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: Number },
    profileUrl: { type: String },
    headerImage: { type: String },
    password: { type: String },
    organization: { type: ObjectId },
    isVerified: { type: Boolean },
    verifyToken: { type: String },
    verifyShortToken: { type: String },
    verifyExpires: { type: Date }, // or a long integer
    verifyChanges: { type: Object }, // an object (key-value map), e.g. { field: "value" }
    resetToken: { type: String },
    resetShortToken: { type: String },
    resetExpires: { type: Date }, // or a long integer
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  return mongooseClient.model('users', users);
};
