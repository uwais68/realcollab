import Message from "../models/message.js";
import ChatRoom from "../models/chatRoom.js";
import UserActivity from "../models/userActivity.js";

// 📩 Send Message
export const sendMessage = async (req, res) => {
  try {
    const { chatRoom, content, messageType, fileUrl, replyTo } = req.body;
    const sender = req.user.userId; // Extracted from JWT

    const message = new Message({ chatRoom, sender, content, messageType, fileUrl, replyTo });
    await message.save();

    // Update Last Message in Chat Room
    await ChatRoom.findByIdAndUpdate(chatRoom, { lastMessage: message._id });

    res.status(201).json({ message: "Message sent!", data: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📜 Get Messages in a Chat Room
export const getMessages = async (req, res) => {
  try {
    const { chatRoom } = req.params;
    const messages = await Message.find({ chatRoom }).populate("sender", "firstName lastName");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Read Message
export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.body;
    await Message.findByIdAndUpdate(messageId, { status: "read" });
    res.json({ message: "Message marked as read!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔄 Update Typing Status
export const updateTypingStatus = async (req, res) => {
  try {
    const { isTyping } = req.body;
    await UserActivity.findOneAndUpdate({ user: req.user.userId }, { isTyping });
    res.json({ message: "Typing status updated!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 👀 Get Last Seen
export const getLastSeen = async (req, res) => {
  try {
    const { userId } = req.params;
    const activity = await UserActivity.findOne({ user: userId });
    res.json({ lastSeen: activity?.lastSeen });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
