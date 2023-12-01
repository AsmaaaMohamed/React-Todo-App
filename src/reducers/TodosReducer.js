import { v4 as uuidv4 } from 'uuid';

export default function reducer(currentTodos , action){
    switch(action.type){
        case "added":{
            const newTodos = [...currentTodos, { ...action.payload, id: uuidv4() }];
            console.log(newTodos);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        }
        case "updated":{
            const updatedTodos = currentTodos.map((t) => { 
                if (t.id === action.payload.id) {
                    t = { ...action.payload };
                }
                return t;
                    
            });     
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
            
        }
        case "deleted":{
            let newTodos = currentTodos.filter((t) =>t.id !==  action.payload.id);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        }
        case "checked":{
            let newTodos = currentTodos.map((t) => {
                if (t.id === action.payload.id) {
                    let newT = {...t};
                    newT.done = !t.done;
                    return newT;
                }
                return t;
              });
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        }
        
        default:{
            throw Error("Unknown Action" + action.type);
        }
    }
}