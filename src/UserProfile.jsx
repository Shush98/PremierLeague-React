import React from 'react'
import { setUser } from "./action";
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import LogoHeader from './components/LogoHeader';
import Footer from './components/Footer';
import axios from "axios";

function UserProfile(props){

    const Nav = useNavigate();
    const handleOnClick = (e) =>{

        axios.post('/UserDelete',{
            Email:props.set_user.Email
          },
          {headers:{'Content-Type':"application/json"}}).then((response) => {
            console.log(response.data)
         });
       
        Nav('/');
    }

    const handleLogOut = (e) =>{
        Nav('/');
    }


    return (
        <div style = {{backgroundColor:"#2D4250", height:750}}>
            <LogoHeader header = "User Profile"></LogoHeader>
            <h1 style={{color:"white"}}>Name: {props.set_user.Name}</h1>
            <h1 style={{color:"white"}}>Email ID: {props.set_user.Email}</h1>
            <br/>
            <br/>
            <Button variant="outlined"  style={{color:"white",marginRight:10,borderColor:"white"}} onClick={handleLogOut}>
             Log Out
            </Button>
            <Button variant="outlined" startIcon={<DeleteIcon />} style={{color:"white",borderColor:"white"}} onClick={handleOnClick}>
             Delete User
            </Button>
            <Footer></Footer>
        </div>
    )
     
}

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
  
  export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);