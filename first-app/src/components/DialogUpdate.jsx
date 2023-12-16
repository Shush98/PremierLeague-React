import React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import {setUser ,setComment} from "../action";

import axios from 'axios'
import {connect} from 'react-redux'


 function DialogUpdate(props) {
  
  // this.handleClickOpen=this.handleClickOpen();
  // this.handleClose=this.handleClose();
  // this.handleAMTChange=this.handleAMTChange(this);
  // this.handleDOCChange=this.handleDOCChange(this);
  // this.onSubmit=this.onSubmit(this);
  const [open,setOpen] = useState(false);
  const [updateText,setUpdateText] = useState("");

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const onUpdate =(e)=> {
    
    
    // e.preventDefault();s

    axios.post('/CommentUpdate',{
        comment_id: props.comment_row.comment_id,
        content:updateText,
        Email:props.set_user.Email
      },
      {headers:{'Content-Type':"application/json"}}).then((response) => {
        console.log(response.data)
     });

     setTimeout(() => {handleClose();
      fetch("/comments").then(
         res => res.json()
       ).then(
         data =>{
           console.log(data)
           props.setComment(data);
           // console.log(data)
         }
       )}, 500);

    //  handleClose();
    //  fetch("/comments").then(
    //     res => res.json()
    //   ).then(
    //     data =>{
    //       console.log(data)
    //       props.setComment(data);
    //       // console.log(data)
    //     }
    //   )
      //  console.log(props.comment_data)
      
} 

  
    
    return (
      <div>

        <Button 
        autoid="export-button"
        variant="outlined" disabled={props.dis} 
        onClick={handleClickOpen}
        style={{backgroundColor:'#252C48',fontSize:13,color:props.colT
        ,borderColor:props.colT,marginTop:18}}>
        Update
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          
        >
          <DialogTitle id="form-dialog-title">Update</DialogTitle>
          
          <DialogContent>
             <label>Comment</label>
            <input 
            autoid="open-amount-input"
            type="text" onChange={(e)=>setUpdateText(e.target.value)} value={updateText} style={{paddingLeft:'20px'}} />
            <br/>
            
            </DialogContent>
          <DialogActions >
          <Button
          autoid="modify-cancel-button"
          variant="outlined" onClick={handleClose} color="primary" style={{border:'2px'}}>Cancel</Button>
            <Button
            autoid="modify-save-button"
            type="submit" value="submit" variant="outlined" onClick={onUpdate} color="primary" >Update</Button>
            
            </DialogActions>
        </Dialog>
      </div>
    );
  }

  const mapStateToProps = state =>{
    return {
      
      set_user : state.set_user,
      comment_data : state.comment_data
    }
  }

  const mapDispatchToProps = dispatch =>{
    return{
      
      setUser : (data) => dispatch(setUser(data)),
      setComment : (data) => dispatch(setComment(data))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(DialogUpdate)