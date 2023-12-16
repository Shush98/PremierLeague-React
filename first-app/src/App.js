
import './App.css';
import GridHome from './GridHome'
import React,{useState , useEffect} from 'react'
import {changeAVAL} from './action';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import GridFixture from './GridFixture';
import GridClub from './GridClub';
import LoginForm from './components/LoginForm';
import UserProfile from './UserProfile';


const App = (props) =>{
  
  const d = 23
  
  // myStore.dispatch({
  //   type : "SET_AVAL",
  //   payload : d
  // })
  // props.set_Aval(d)
  // console.log("Inisde APP: ",props.A_val)
  return (
    <div className="App" >
      <Router>
          <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route path="/Home" element={<GridHome />} />
            <Route path="/fixture-dashboard" element={<GridFixture />} />
            <Route path="/club-dashboard" element={<GridClub />} />
            <Route path="/User" element={<UserProfile />} />
          </Routes>
        </Router>
      {/* {console.log("Inisde APP: ",props.A_val)}
      <GridHome></GridHome> */}
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    A_val : state.A_val
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    set_Aval : (data) => dispatch(changeAVAL(data))}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
