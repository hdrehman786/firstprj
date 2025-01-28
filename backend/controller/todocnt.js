import { Todo } from "../modals/todoModel.js";

export const createTodo = (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Please enter all fields" });
    }
    const todo = new Todo({
        text
    });
    todo.save().then(result => {
        res.status(201).json({ message: "Todo added successfully", todo: result });
    }).catch(err => {
        res.status(500).json({ error: "Something went wrong" });
    });
}


export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);

    }catch (err) {
        res.status(500).json({ error: "Something went wrong", details: err.message });
    }
}


export const updateTodo = async (req, res) => {
    const id = req.params.todoId; // Updated to match the route parameter
    const { text } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
        res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong", details: err.message });
    }
}

export const deleteTodo = async (req, res) => {
    const id = req.params.todoId; 
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id); 
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong", details: err.message });
    }
}


export const updateCompleted = async (req, res) => {
    const id = req.params.id;
    const { completed } = req.body;

    // Check if completed is a boolean
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: "Invalid input: 'completed' must be a boolean." });
    }

    try {
        // Find and update the todo
        const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true, useFindAndModify: false });

        // Check if the todo was found and updated
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found." });
        }

        res.status(200).json({ message: "Todo boolean value updated successfully", todo: updatedTodo });
    } catch (e) {
        console.error(e); // Log the error for debugging
        res.status(500).json({ error: "Something went wrong", details: e.message });
    }
};