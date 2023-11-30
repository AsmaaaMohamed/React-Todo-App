import {Card, CardActions,CardContent,Typography,Button, IconButton} from '@mui/material';
import { Edit,Done,DeleteForever } from '@mui/icons-material';
import './SingleTodo.css';
import { useContext } from 'react';
import { TodosContext } from '../Contexts/TodosContext';
import { ModalContext } from '../Contexts/ModalContext';
import { SnackBarContext } from '../Contexts/SnackBarContext';


export default function SingleTodo({ todo }) { 
    
    const { toDos, setToDos } = useContext(TodosContext);
    const { setModalOptions } = useContext(ModalContext);
    const { showSnackbar } = useContext(SnackBarContext);
    function handleCheck() {
        let newTodos = toDos.map((t) => {
            if (t.id === todo.id) {
              t.done = !t.done;
            }
            return t;
          });
        setToDos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        showSnackbar({messagee:"Todo is Updated"});
    }
    function handleDeleteClick() {
        setModalOptions({
            showModal: true,
            modalTitle: 'Delete Todo?',
            message: 'Are you sure to delete this todo?',
            type: 'Delete',
            todo: todo,
        });
    }
    function handleEditClick() {
        setModalOptions({
            showModal: true,
            modalTitle: 'Edit Todo',
            message: '',
            type: 'Update',
            todo: todo,
        });
        
    }
    return (
        <Card className="todoCard" sx={{ minWidth: 275,background:'#283593' , margin: '20px 0'}}>
            <CardContent sx={{ marginTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography  component="div"  sx={{textAlign:'left'}}>
                    <Typography variant="h5" component="div"  sx={{fontSize:'20px',color:'#fff',textDecoration: todo.done ? 'line-through' : 'none'}}>
                        {todo.title}
                    </Typography>
                    <Typography  sx={{fontSize:'14px',color:'#ffffffd4'}}>
                        {todo.description} 
                    </Typography>
                </Typography>
                
                <Typography  component="div" sx={{ display:'flex' ,justifyContent:'space-around',gap:'5px'}}>
                    <IconButton className={todo.done ? 'isDone' : ''} aria-label="delete" style={{color:'#8bc34a' , background:"white", border:"3px solid #8bc34a"}} onClick={()=>handleCheck()}><Done/></IconButton>
                    <IconButton className="iconButton" style={{color:'#1769aa' , background:"white", border:"3px solid #1769aa"}} onClick={()=>handleEditClick()}><Edit/></IconButton>
                    <IconButton className="iconButton" aria-label="delete" style={{color:'#b23c17' , background:"white", border:"3px solid #b23c17"}} onClick={()=>handleDeleteClick()}><DeleteForever/></IconButton>
                </Typography>
            </CardContent>
        </Card>
    );
}