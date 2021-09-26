import { useState, useEffect } from 'react';
import {List} from './list';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditModal from './editModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export default () => {

    const [list, setList] = useState();
    const [listOfList, setListOfList] = useState([]);
    
    const removeTodoList = async (list) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todolist/${list.id}`, {
                method: "DELETE"
            });
            setListOfList(listOfList.filter(l => l.id != list.id))
        } catch(err) {
            console.error(err.message);
        }
    };

    const editTodoList = async (id, newDescription) => {
        try {
            const response = await fetch(
                `http://localhost:5000/todolist/description/${id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({description: newDescription})
                }
              );
            const thisList = listOfList.find(l => l.id === id);
            thisList.description = newDescription;
            console.log(listOfList);
            setListOfList([...listOfList]);
        } catch(err) {
            console.error(err.message);
        }
    };

    const addTodoList = async (description) => {
        try {
            const response = await fetch(`http://localhost:5000/todolist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({description: description})
            });
            const jsonData = await response.json();
            setListOfList([...listOfList, jsonData]);
        } catch(err) {
            console.error(err.message);
        }
    };

    const getTodoList = async () => {
        try {
            const response = await fetch("http://localhost:5000/todolist");
            const jsonData = await response.json();
            setListOfList(jsonData);
        } catch(err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodoList();
      }, []);
    

    return (
        <div style={{fontSize: '25px'}}>
            <div style={{marginBottom: '10px'}}>
                <span style={{marginRight: '5px'}}>Enter list name</span>
                <TextField style={{paddingRight: '10px'}} value={list} onChange={e => setList(e.target.value)} variant="standard" />
                <Button sx={{ display: 'inline' }} variant="contained" onClick = {async () => {await addTodoList(list);}}>
                    <AddIcon fontSize="small" />
                </Button>
            </div>
            {listOfList.map(list =>  (
                    <div style={{padding: '10px', marginTop: '50px', background: '#B8C9E1' }}>
                        <span style={{paddingRight:'10px'}}>{list.description}</span>
                        <EditModal  title={<EditIcon fontSize="small" />} inputValue={list.description} onClose={(description) => editTodoList(list.id, description)}/>
                        <Button sx={{ display: 'inline' }} variant="contained" onClick={async () => await removeTodoList(list)} aria-label="delete" size="small">
                            <DeleteIcon sx={{ display: 'inline' }} />
                        </Button>
                        <br/>
                        <div style={{marginTop: '10px'}}>
                            <List id={list.id}x/>
                        </div>
                    </div>
            ))}
        </div>
    );
};