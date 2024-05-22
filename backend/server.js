const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes=require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes  = require("./routes/messageRoutes");

const {notFound , errorHandler} = require("./middleware/errorMiddleware");
const path = require("path");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());//to accept JSON data

// app.get('/',(req,res)=>{
//     res.send("API is running");
// });


app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);

//Route for sending messages
app.use("/api/message",messageRoutes);


//-------Deployment---
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname1,"/frontend/build")));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
    })
}
else
{
    app.get("/",(req,res)=>{
        res.send("API is running");
    })
}


const colors=require("colors");



// app.use('/api/user',userRoutes)

//Error handling middlwares if we provide a wrong Api then it will execute
app.use(notFound);
app.use(errorHandler);

// app.get("/api/chat",(req,res)=>{
//     res.send(chats);
// });

// app.get('/api/chat/:id',(req,res)=>{
//     // console.log(req.params.id);//way to fetch the particular id from chats
//     const singleChat = chats.find((c)=>c._id === req.params.id)
//     {
//         res.send(singleChat);
//     }
// })



;


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,console.log(`Server running on port number ${PORT}`.yellow.bold));

const io = require("socket.io")(server,{
    pingTimeOut: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection",(socket)=>{
    console.log("connected to socket.io");

    socket.on("setup",(userData) =>{
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat",(room) =>{
        socket.join(room);
        console.log("User Joined Room: "+ room);
    });


    //socket for typing
    socket.on("typing",(room) => socket.in(room).emit("typing"));
    socket.on("stop typing",(room) => socket.in(room).emit("stop typing"));


    socket.on("new message",(newMessageReceived) =>{
        var chat = newMessageReceived.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user => {
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received",newMessageReceived);
        })   ;     
    });

   socket.off("setup",()=>{
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
   }) 
});

