import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SingleTodo from './SingleTodo';
import Grid from "@mui/material/Unstable_Grid2";
import { useContext , useEffect,useMemo } from 'react';
import { TodosContext } from '../Contexts/TodosContext';
import { ModalContext } from '../Contexts/ModalContext';

export default function TodoList() {
  const [filterTasks, setFilterTasks] = React.useState('all');
  const handleFilterChange = (event) => {
    setFilterTasks(event.target.value);
  };
  const { modalOptions,setModalOptions} = useContext(ModalContext);
  const { toDos, setToDos } = useContext(TodosContext);
  const completedTodos = useMemo(() => toDos.filter((t) => t.done),[toDos]) ;
  const notCompletedTodos = useMemo(()=> toDos.filter((t) => !t.done),[toDos]);
  const filteredTodos = {
    all: toDos,
    done: completedTodos,
    not: notCompletedTodos
  }
  let mappedToDos = filteredTodos[filterTasks].map((toDo) => {
    return (
      <SingleTodo key={toDo.id} todo={toDo}/>
    )
  });
  const initialTodo = { title: '', description: '', done: '' };
  useEffect(() => { 
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos !== null)
      setToDos(storedTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function handleAddClick() {
    setModalOptions({
      showModal: true,
      modalTitle: 'Add Todo',
      message: '',
      type: 'Add',
      todo: initialTodo,
  });
  }
  
  return (
    
    <Stack spacing={2} sx={{justifyContent:'center'}} >
     <Card sx={{ minWidth: 275,maxHeight:'80vh' ,overflowY:'scroll'}}>
        <CardContent>
          <Typography variant="h1" component="div" sx={{ fontWeight:900}}>
            My Tasks
          </Typography>
          <Divider variant="middle" />
          <ToggleButtonGroup
              value={filterTasks}
              exclusive
              onChange={(e)=>handleFilterChange(e)}
            aria-label="text alignment"
            color='primary'
            >
              <ToggleButton value="all" aria-label="left aligned">
                All
              </ToggleButton>
              <ToggleButton value="done" aria-label="centered">
                Done
              </ToggleButton>
              <ToggleButton value="not" aria-label="right aligned">
                Not Yet
              </ToggleButton>
          </ToggleButtonGroup>
          {/* All Todos */}
          {
           mappedToDos
          }
          
          {/* ====== All Todos ==== */}
          {/* "Add Todo" Section */}
          <Grid container spacing={2} justifyContent="center" alignItems='center'>
            
            <Grid  xs={6} >
              <Button variant="contained" sx={{ width: '100%', padding: "calc((var(--Grid-rowSpacing) + 12px) / 2 ) calc((var(--Grid-columnSpacing) + 32px) / 2 )" }} onClick={() => { handleAddClick(); }} > Add </Button>
            </Grid>
          </Grid>
          {/* "Add Todo" Section */}
        </CardContent>
      </Card>
    </Stack>
    
  );
}