import './Modal.css';
import { useContext  } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import * as React from 'react';
import Button from '@mui/material/Button';
import { TodosContext } from '../contexts/TodosContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { SnackBarContext } from '../contexts/SnackBarContext';


export default function MyModal() {
    const { modalOptions, setModalOptions } = useContext(ModalContext);
    const { toDos, dispatch } = useContext(TodosContext);
    const { showSnackbar } = useContext(SnackBarContext);
   
    let newTodo =  {...modalOptions.todo} ;
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
        dispatch({type:'deleted' , payload:newTodo})
        showSnackbar({bool:true , messagee:"Todo is Deleted Successfully"});
        handleClose();
    }
    function handleModalUpdateClick() {
        dispatch({type:'updated' , payload:newTodo});
        showSnackbar({ messagee:"Todo is Updated Succefully"});
        handleClose();
    }
    function handleModalAddClick() {
        dispatch({type:'added' , payload:newTodo});
        showSnackbar({messagee:"Todo is Added Succefully"});
        handleClose();
    }
    if (modalOptions.showModal)
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