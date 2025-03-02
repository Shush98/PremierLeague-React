import { Grid } from '@mui/material'
import React from 'react'
import { setUser } from "../action";
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';

function LogoHeader(props) {

  const Nav = useNavigate();

  const handleOnClick = () =>{

    Nav('/Home');

  }

  const handleProfileOnClick = ()=>{
    Nav('/User');
  }


  return (
    <div style={{ padding: 10 }}>
      <Grid container style={{backgroundColor:'#283C48'}}>
        <Grid item xs={1} style={{backgroundColor:'#283C48'}}>
          <img src="PL_Logo.svg" alt="abc_logo" style={{width:"70px", marginLeft:"2px"}} onClick={handleOnClick}/>
        </Grid>
        <Grid item xs={8}>
          <h2 style = {{color:"white",marginLeft:200}}>{props.header}</h2>
        </Grid>
        <Grid item xs={2}>
          <h5 style = {{color:"white",textAlign:"right"}}>Email: {props.set_user.Email}</h5>
        </Grid>
        <Grid item xs={1}>
        <img src="profileLogo.svg" alt="proflogo" style={{width:"40px", marginLeft:"2px",marginTop:14}} onClick={handleProfileOnClick}/>
        </Grid>
      </Grid>
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

export default connect(mapStateToProps,mapDispatchToProps)(LogoHeader);