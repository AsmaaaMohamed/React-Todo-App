import { createContext , useState,useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import reducer from '../reducers/TodosReducer';

export const TodosContext = createContext([]);
export function TodosProvider({ children }) {
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
      const[toDos , dispatch] = useReducer(reducer , standardToDos)
    //const [toDos, setToDos] = useState(standardToDos);
    return (
        
        <TodosContext.Provider value={{ toDos, dispatch }}>
            {children}
        </TodosContext.Provider>
    )
}