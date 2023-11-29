import './App.css';
import * as React from 'react';
import TodoList from './Components/TodoList';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {TodosContext} from "./Contexts/TodosContext";
import { v4 as uuidv4 } from 'uuid';
import MyModal from './Components/Modal';
import { ModalContext } from './Contexts/ModalContext';
import { SnackBarProvider } from './Contexts/SnackBarContext';
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato"],
    },
    palette: {
      primary: {
        main:"#dd2c00",
      },
    },
  });
  let standardToDos = [
    {
      id: uuidv4(),
      title: "The first Todo",
      description: "The first Todo description",
      done: false
    },
    {
      id: uuidv4(),
      title: "The second Todo",
      description: "The second Todo description",
      done: false
    },
    {
      id: uuidv4(),
      title: "The third Todo",
      description: "The third Todo description",
      done: false
    },
  ];
  const [toDos, setToDos] = React.useState(standardToDos);
  const initModal = {
    showModal: false,
    message: '',
    type: '',
    todo: {},
  }
  const [modalOptions, setModalOptions] = React.useState(initModal);
  let modalJsx = modalOptions.showModal ? <MyModal value={{modalOptions , setModalOptions} } /> : '';
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <ModalContext.Provider value={{modalOptions,setModalOptions}}>
          <div className="App" style={{position:'relative'}}>
            <Container maxWidth="sm" className='main-content' >
              <TodosContext.Provider value={{toDos,setToDos} } >
                <TodoList />
                {modalJsx}
              </TodosContext.Provider>
            </Container>
          </div>
          </ModalContext.Provider>
        </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
