const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

// routers
const routerTodoList = require('./router/TodoList') 
const routerUsers = require('./router/UserRouter')

// app express & db
const app = express();

// middleware

app.use( (req,res, next) => {
    console.log(req.path,req.method)
    next()
})

app.use(express.json());

//routers
app.use("/api/todolists", routerTodoList);
app.use("/api/users", routerUsers);


mongoose.connect(process.env.MONGO_URL)
        .then( () => {
            // listing on port
            app.listen(process.env.PORT, ()=> {
                console.log('connecting to db listenning on port', process.env.PORT)
            })
        }).catch((error) => console.log(error));

