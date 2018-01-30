// invites-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const { ObjectId } = require('mongoose').Schema.Types;

const STATUS_OPTIONS = {

};

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const invites = new Schema({
    email: { type: String, required: true },
    invitedBy: { type: ObjectId, required: true },
    from: {
      _id: { type: ObjectId },
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
    },
    status: { type: String, enum: ['Created', 'Pending', 'Accepted'], default: 'Created' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('invitees', invites);
};
