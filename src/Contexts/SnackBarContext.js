import { createContext, useState } from "react";
import CustomizedSnackbars from "../Components/CustomizedSnackbars";

export const SnackBarContext = createContext('');
export function SnackBarProvider({children}) {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const showSnackbar = ({  messagee }) => {
        setOpenSnackBar(true);
        setSnackBarMessage(messagee);
    }
    const handleClose = () => {
        setOpenSnackBar(false);
      };
    return (
        <SnackBarContext.Provider value={{showSnackbar , handleClose}} >
            <CustomizedSnackbars open={openSnackBar} message={snackBarMessage} />
            {children}
        </SnackBarContext.Provider>
    )
}