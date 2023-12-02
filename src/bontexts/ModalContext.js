import { createContext, useState } from "react";

export const ModalContext = createContext({});
export function ModalProvider({children}) {
    const initModal = {
        showModal: false,
        message: '',
        type: '',
        todo: {},
      }
    const [modalOptions, setModalOptions] = useState(initModal);
    
    return (
        <ModalContext.Provider value={{ modalOptions, setModalOptions }}>
            
            {children}
        </ModalContext.Provider>
    )
}