// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
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
