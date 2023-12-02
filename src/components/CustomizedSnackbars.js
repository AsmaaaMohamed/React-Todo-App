import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackBarContext } from '../contexts/SnackBarContext';
import { useContext } from 'react';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({open,message}) {
  const { handleClose } = useContext(SnackBarContext);
  const myHandleClose = (event ,reason) => {
    if (reason === 'clickaway') {
      return;
    }
    handleClose();
  };
  
  return (
    
      <Snackbar open={open} autoHideDuration={2000} onClose={myHandleClose}>
        <Alert onClose={myHandleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    
  );
}