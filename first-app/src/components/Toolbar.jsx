
import Grid from '@mui/material/Grid';
import {Button } from "@mui/material";
import axios from "axios";
import {setComment,setUser} from "../action";
import { connect } from 'react-redux';
import DialogUpdate from './DialogUpdate';


function Toolbar(props){

  const handleDelete =(e) =>{
    // e.preventDefault();

        axios.post('/CommentDelete',{
            comment_id:props.comment_row.comment_id,
            Email:props.set_user.Email
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
          )},500)
           
     }

  if(props.SELECTED===0)
  {
    return(
        <div> 
        <Grid container  >
        <Grid item xs={9}>        
        <h2 style={{color:"white"}}>Comments</h2>
        </Grid>
        <Grid item xs={1.5}>
        {/* <Button 
        autoid="export-button"
        variant="outlined" disabled='true' 
        style={{backgroundColor:'#252C48',fontSize:13,color:'gray'
        ,borderColor:'gray',marginTop:18}}>
        Update
        </Button> */}
        <DialogUpdate dis ={true} colT = "gray" comment_row = {props.comment_row}></DialogUpdate>
        </Grid>
        <Grid item xs={1.5}>
        <Button 
        autoid="export-button"
        variant="outlined" disabled='true' 
        style={{backgroundColor:'#252C48',fontSize:13,color:'gray'
        ,borderColor:'gray',marginTop:18}} >
        Delete    
        </Button>
        </Grid>
        </Grid>
         </div>
     );
  }
  else
  {
    return(
        <div> 
        <Grid container  >
        <Grid item xs={9}>        
        <h2 style={{color:"white"}}>Comments</h2>
        </Grid>
        <Grid item xs={1.5}>
        {/* <Button 
        autoid="export-button"
        variant="outlined"  
        style={{backgroundColor:'#252C48',fontSize:13,color:'white'
        ,borderColor:'white',marginTop:18}}>
        Update
        </Button> */}
        <DialogUpdate dis ={false} colT = "white" comment_row = {props.comment_row}></DialogUpdate>
        </Grid>
        <Grid item xs={1.5}>
        <Button 
        autoid="export-button"
        variant="outlined"  
        style={{backgroundColor:'#252C48',fontSize:13,color:'white'
        ,borderColor:'white',marginTop:18}} onClick={handleDelete}>
        Delete    
        </Button>
        </Grid>
        </Grid>
         </div>
     );
  }
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

export default connect(mapStateToProps,mapDispatchToProps)(Toolbar);