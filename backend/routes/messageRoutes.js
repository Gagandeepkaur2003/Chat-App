const express = require("express");
const {sendMessage} = require("../controllers/messageControllers");
const {allMessages} = require("../controllers/messageControllers");

const { protect } = require("../middleware/authMiddleware");
// const { route } = require("./userRoutes");

const router = express.Router();

router.route("/").post(protect,sendMessage);//to send the chat
router.route("/:chatId").get(protect,allMessages);//to fetch the chat 

module.exports = router;