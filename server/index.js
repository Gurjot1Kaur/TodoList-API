/* This is the code for a basic server */

const express = require("express"); 
const app = express();
const cors = require("cors"); 
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body 

//ROUTES//

//GET: get all the TodoLists
app.get("/todolist", async(req, res) => {
    try {
        const allTodoLists =await pool.query("SELECT * FROM todo_list");
        res.json(allTodoLists.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//POST: create a TodoList
app.post("/todolist", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodoList = await pool.query(
        "INSERT INTO todo_list (description) VALUES ($1) RETURNING *", 
        [description]
        );
        res.json(newTodoList.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})


//PUT: Update a TodoList description 
app.put("/todolist/description/:id", async(req, res) => {
    try {
       const { id } = req.params;
       const { description } = req.body;
       const updateTodo =await pool.query("UPDATE todo_list SET description =$1 WHERE id = $2",
        [description, id]);
       res.json("Todolist description was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//DELETE: delete a todoList
app.delete("/todolist/:id", async(req, res) => {
    try {
       const { id } = req.params;
       const deleteTodoItems =await pool.query("DELETE FROM todo_item WHERE fk_list_id = $1",
        [id]);
       const deleteTodoList =await pool.query("DELETE FROM todo_list WHERE id = $1", [id]);
       res.json("TodoList was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})


//POST: create a TodoItem for a specific list
app.post("/todoitem/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const newTodo = await pool.query(
        "INSERT INTO todo_item (fk_list_id, done, description) VALUES($1, $2, $3) RETURNING *", 
        [id, false, description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//GET: get all the TodoItem's in the TodoList
app.get("/todolist/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const allTodoItems =await pool.query("SELECT * FROM todo_item WHERE fk_list_id = $1", [id]);
        res.json(allTodoItems.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//GET: get a particular TodoItem
app.get("/todoitem/:id", async(req, res) => {
    try {
       const { id } = req.params;
       const todo =await pool.query("SELECT * FROM todo_item WHERE id = $1", [id]);
       res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//PUT: Update a TodoItem description 
app.put("/todoitem/description/:id", async(req, res) => {
    try {
       const { id } = req.params;
       const { description } = req.body;
       const updateTodo =await pool.query("UPDATE todo_item SET description =$1 WHERE id = $2",
        [description, id]);
       res.json("Todo description was updated!");
    } catch (err) {
        console.error(err.message);
    }
})

//PUT: Update a TodoItem to done 
app.put("/todoitem/done/:id", async(req, res) => {
    try {
       const { id } = req.params;
       const updateTodo =await pool.query("UPDATE todo_item SET done =$1 WHERE id = $2",
        [true, id]);
       res.json("Todo was marked done!");
    } catch (err) {
        console.error(err.message);
    }
})

//DELETE: delete a todoListItem
app.delete("/todoitem/:id", async(req, res) => {
    try {
       const { id } = req.params;
       const deleteTodoItem =await pool.query("DELETE FROM todo_item WHERE id = $1",
        [id]);
       res.json("TodoItem was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, ()=> {
    console.log("server has started on port 5000");

});
