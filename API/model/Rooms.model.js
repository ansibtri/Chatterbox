const { Schema, model } = require("mongoose");

const Room = new Schema({
  participants: [], // Array of user IDs (participants in the room)
  createdAt: Date, // Timestamp when the room was created
  updatedAt: Date, // Timestamp when the room was last updated
  isGroup: Boolean, // Indicates if it's a group chat
  groupName: String, // Name of the group (only for group chats)
  groupAdmin: Schema.Types.ObjectId, // User ID of the group admin (only for group chats)
  lastMessage: {
    content: String, // Content of the last message in the room
    senderId: Schema.Types.ObjectId, // User ID of the sender
    timestamp: Date, // Timestamp of the last message
  },
});

module.exports = model('Rooms', Room)