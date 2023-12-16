import { FormControl, TextField, Button } from "@mui/material";
import { useState } from "react";
import {fixRow, setUser ,setComment} from "../action";
import axios from "axios";
import { connect } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import AccountCircle from '@mui/icons-material/AccountCircle';

function PostComment(props){

     const [comment,setComment] = useState("");

     const handleOnSubmit = (e)=>{

        

        e.preventDefault();

        axios.post('/CommentPost',{
            match_id: props.fix_row.match_id,
            EmailID: props.set_user.Email,
            CommentText: comment
          },
          {headers:{'Content-Type':"application/json"}}).then((response) => {
            console.log(response.data)
         });

         setTimeout(() => {fetch("/comments").then(
            res => res.json()
          ).then(
            data =>{
              
              props.setComment(data);
              // console.log(data)
            }
          )},500);
           
     }

    return (
        <form style={{height:350,backgroundColor:'#283C48'}}>
      
      <FormControl margin="normal">
      
        <TextField
          style={{marginTop:100}}
          variant="standard"
          id="comment"
          label="Type your Comment Here"
          name="PostComment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          
        />
      </FormControl>
      <Button  type="submit" variant="contained" endIcon={<SendIcon />} style ={{marginTop:125,marginLeft:10}} onClick={handleOnSubmit}>Post</Button>
    </form>
    )
}

const mapStateToProps = state =>{
    return {
      fix_row : state.fix_row,
      set_user : state.set_user,
      comment_data : state.comment_data
    }
  }

  const mapDispatchToProps = dispatch =>{
    return{
      fixRow : (data) => dispatch(fixRow(data)),
      setUser : (data) => dispatch(setUser(data)),
      setComment : (data) => dispatch(setComment(data))
    }
  }  

  export default connect(mapStateToProps,mapDispatchToProps)(PostComment);
