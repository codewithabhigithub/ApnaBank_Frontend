import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

function PopUp(prop){
    // const {openPopUp,setOpenPopUp,children,customer}=props;
  
    return(
        <diV>
        <Dialog >
            <DialogTitle>
              <h1 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Title</h1>
            </DialogTitle>
            <DialogContent>
               <h2 style={ { fontFamily : 'LatoBold',fontWeight:'bold' } } >Content</h2>
            </DialogContent>
        </Dialog>
        </diV>
    )
}
export default PopUp()