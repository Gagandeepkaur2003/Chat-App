const { registerUser,authUser,allUsers } = require("../controllers/userControllers");
const {protect} = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.route("/").post(registerUser).get(protect,allUsers);

//functionality for login
router.post('/login',authUser);

module.exports = router;