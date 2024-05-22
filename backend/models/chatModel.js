const mongoose = require('mongoose')
//create a chatModel

const chatModel = mongoose.Schema(
    {
        chatName: { type : String , trim: true},
        isGroupChat : {type: Boolean , default: false},
        users : [{
            type: mongoose.Schema.Types.ObjectId,//to fetch the id of the user and we create an array because fror a single chat there are 2 users required kept in an arrya and for the groupchat we require more than 2 users
            ref : "User"
        }],
        
        latestMessage : 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Message",
        },

        groupAdmin:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    },
    {
        timestamps:true,
    }
)//inside the schema we will define our object

const Chat = mongoose.model("Chat",chatModel);
module.exports = Chat;
