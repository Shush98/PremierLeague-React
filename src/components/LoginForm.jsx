import React from "react";
import { FormControl, TextField, Button } from "@mui/material";
import {useNavigate} from 'react-router-dom';
import { setUser } from "../action";
import { connect } from 'react-redux';
import axios from "axios";
import image from "../LoginBG.jpg"; 
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Padding } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
    &.Mui-disabled fieldset {
      border-color: white;
    }
  }
  
`;

const LoginForm = (props) => {

  
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const Nav = useNavigate();

  const handleOnSubmit =(e) =>{
    console.log({Name:name,Email:email})
    props.setUser({Name:name,Email:email})
    // console.log(props.set_user)
    // fetch("/UserPost", {
    //   method: "POST",
    //   body: JSON.stringify({
    //       Name: name,
    //       Email: email,
    //   }),
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //       // Set the state to the data returned from the backend
    //       console.log(data);
    //   })

    axios.post('/UserPost',{
      Name: name,
      Email: email
    },
    {headers:{'Content-Type':"application/json"}}).then((response) => {
      console.log(response.data)
   });

    Nav('/Home');

  };

  return (
    <div style={{height:775,backgroundImage:`url(${image})`}}>
      <Grid container spacing={1} marginRight={1} >
      <Grid item xs={5} >
          <Item style={{backgroundColor:'transparent',height:748}}>
          <h1 style={{fontSize:50,paddingTop:80,color:'white'}}>Welcome!</h1>
          <form style={{paddingTop:30}}>
      <FormControl margin="normal">
        <WhiteBorderTextField
          id="name"
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          
        />
      </FormControl>
      <br/>
      <FormControl margin="normal">
        <WhiteBorderTextField
          id="email"
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
      </FormControl>
      <br/>
      <Button type="submit" onClick={handleOnSubmit} style={{marginTop:25,paddingLeft:30,paddingRight:30,marginLeft:10,backgroundColor:'cyan',color:'black'}}><b>Submit</b></Button>
    </form>
          </Item>
        </Grid>
        <Grid item xs={7} >
          <Item style={{backgroundColor:'transparent',height:748}}>
          <img src="./LoginLOGO.png" style={{width:400,height:500,paddingTop:100}} />
          </Item>
        </Grid>  
      </Grid>
      
    
    </div>
  );
};

const mapStateToProps = state =>{
    return {
      set_user : state.set_user
    }
  }
  
  const mapDispatchToProps = dispatch =>{
    return{
      setUser : (data) => dispatch(setUser(data))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);