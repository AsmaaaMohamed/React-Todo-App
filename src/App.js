import './App.css';
import * as React from 'react';
import TodoList from './Components/TodoList';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {TodosProvider} from "./Contexts/TodosContext";
import MyModal from "./Components/Modal";

import { ModalProvider } from './Contexts/ModalContext';
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
 
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <ModalProvider >
          <div className="App" style={{position:'relative'}}>
            <Container maxWidth="sm" className='main-content' >
              <TodosProvider  >
                <TodoList />
                <MyModal />
              </TodosProvider>
            </Container>
          </div>
          </ModalProvider>
        </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
