const express = require("express");
const { accessChat, fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup } = require("../controllers/chatControllers");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChats);//get all the chats from database of that particular user
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);//put becoz we are updating(renaming)
router.route("/groupadd").put(protect,addToGroup);
router.route("/groupremove").put(protect,removeFromGroup);

module.exports = router;