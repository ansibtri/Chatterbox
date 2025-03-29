const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  roomId: ObjectId, // ID of the room where the message was sent
  senderId: ObjectId, // ID of the user who sent the message
  content: String, // Content of the message
  createdAt: Date, // Timestamp when the message was sent
  updatedAt: Date, // Timestamp when the message was last updated
  readBy: [ObjectId], // Array of user IDs who have read the message
  type: { type: String, default: "text" }, // Type of message (text, image, file, etc.)
  metadata: {
    // Optional metadata for the message (e.g., file URL, image dimensions)
    fileUrl: String,
    fileSize: Number,
    imageWidth: Number,
    imageHeight: Number,
  },
});
