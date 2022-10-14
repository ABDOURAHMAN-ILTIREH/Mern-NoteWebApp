const TodoLists = require('../model/TodolistsModel')
const mongoose = require('mongoose')

// get all todo lists

const getAllTodolists =  async (req,res) => {
    const user_id = req.user._id

    const todoList = await TodoLists.find({user_id}).sort({ createdAt: -1 })
    res.status(200).json(todoList)
}

// add a new todo list
const addNewTodoList = async (req, res) => {
    const {title, text} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push("title")
    }
    if(!text) {
        emptyFields.push("text")
    }
    
    if(emptyFields.length > 0) {
        return res.status(400).json({error : "veuille remplir les champs vides" , emptyFields})
    }
    try {
        const user_id = req.user._id
        const todoList = await TodoLists.create({title, text, user_id})
        res.status(200).json(todoList)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
 
// delete  todo lists
const DeleteTodoList = async (req, res) => {
   const {id} = req.params

   if(!mongoose.Types.ObjectId.isValid(id)){
       res.status(404).json({error: 'Invalid id in todo list'})
   }

   const todoList = await TodoLists.findOneAndDelete({_id:id})

   if(!todoList){
    res.status(404).json({error:"todo list not found"})
   }
   res.status(200).json(todoList)
}



module.exports = {
    getAllTodolists,
    addNewTodoList,
    DeleteTodoList
}