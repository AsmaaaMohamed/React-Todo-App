import './Modal.css';
import { useContext , useEffect } from 'react';
import { ModalContext } from '../Contexts/ModalContext';
import * as React from 'react';
import Button from '@mui/material/Button';
import { TodosContext } from '../Contexts/TodosContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';

export default function MyModal() {
    const { modalOptions, setModalOptions } = useContext(ModalContext);
    const { toDos, setToDos } = useContext(TodosContext);
    
    let newTodo =  modalOptions.todo ;
    //console.log(modalOptions);
    const textFields = modalOptions.type === 'Delete' ? '' :
        <><TextField value={newTodo.title} autoFocus margin="dense" id="title" label="Title" type="text" fullWidth variant="standard" onChange={(e) => { newTodo.title = e.target.value; setModalOptions({ ...modalOptions, todo: newTodo }) }} /><TextField value={newTodo.description} autoFocus margin="dense" id="desc" label="Description" type="text" fullWidth variant="standard" onChange={(e) => { newTodo.description = e.target.value; setModalOptions({ ...modalOptions, todo: newTodo }) }} /></>;
    const handleClicksFuncs = {
        Delete: handleModalDeleteClick,
        Update: handleModalUpdateClick,
        Add:    handleModalAddClick
        
    }
    const handleClose = () => {
        setModalOptions({...modalOptions, showModal:false});
    };


    function handleModalDeleteClick (){
        let newTodos = toDos.filter((t) =>t.id !== newTodo.id);
        setToDos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        handleClose();
    }
    function handleModalUpdateClick() {
        const updatedTodos = toDos.map((t) => { 
            if (t.id === newTodo.id) {
                t = { ...newTodo };
            }
            return t;
                
        })
        setToDos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        handleClose();
    }
    function handleModalAddClick() {
        const newTodos = [...toDos, { ...newTodo, id: uuidv4() }];
        setToDos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        handleClose();
    }
    return (
        <>
            <Dialog
            open={modalOptions.showModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {modalOptions.modalTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalOptions.message}
                    </DialogContentText>
                    {textFields}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClicksFuncs[modalOptions.type]} disabled={newTodo.title.length <= 0} autoFocus>
                        {modalOptions.type}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

}