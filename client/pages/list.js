import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditModal from './editModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export const List = (props) => {
    const [todoList, setTodoList] = useState([]);

    const [addTodo, setAddTodo] = useState(null);
        
    const removeTodoItem = async todo => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todoitem/${todo.id}`, {
                method: "DELETE"
            });
            setTodoList(todoList.filter(t => t.id != todo.id ));
        } catch(err) {
            console.error(err.message);
        }
    };
    

    const editTodoItem = async (id, newDescription) => {
        try {
            const response = await fetch(
                `http://localhost:5000/todoitem/description/${id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({description: newDescription})
                }
              );
            const thisItem = todoList.find(t => t.id === id);
            thisItem.description = newDescription;
            setTodoList([...todoList]);
        } catch(err) {
            console.error(err.message);
        }
    };

    const addTodoItem = async (description) => {
        try {
            const response =  await fetch(`http://localhost:5000/todoitem/${props.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({description: description})
            });
            const jsonData = await response.json();
            setTodoList([...todoList, jsonData]);
        } catch(err) {
            console.error(err.message);
        }
    };

    const getTodos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/todolist/${props.id}`);
      const jsonData = await response.json();
      setTodoList(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    getTodos();
  }, []);


    return (
        <span style={{fontSize: '20px'}}>
            <div>Add items to this list
                <TextField value = {addTodo} onChange={e=>setAddTodo(e.target.value)} variant={"standard"}/>
                <Button sx={{ display: 'inline' }} variant="contained" onClick = {async () => {await addTodoItem(addTodo);}}>
                    <AddIcon fontSize="small" />
                </Button>
            </div>

            {todoList.map((item, index) => (
                <>
                <div>

                {item.description}
                <EditModal  title={<EditIcon fontSize="small" />} inputValue={item.description} onClose={(description) => editTodoItem(item.id, description)}/>
                <Button sx={{ display: 'inline' }} variant="contained" onClick={async () => await removeTodoItem(item)} aria-label="delete" size="small">
                            <DeleteIcon sx={{ display: 'inline' }} />
                        </Button>
                </div>
                </>
            ))}
  
        </span>
    );
};

