
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LineChart1 from './components/LineChart1'
import BarChart from './components/BarChart'
import HomeTable from './components/HomeTable'
import React,{useState , useEffect} from 'react'
import LogoHeader from "./components/LogoHeader";
import Footer from "./components/Footer";

import Fix_table from './components/Fix_table';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function GridHome(props) {

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(() => {setLoading(false);},1500)
  },[])

  return (
    
    <>
   
   {loading ? (
          <img src='PL_GIF.gif' style={{width:'100%',height:'70%'}} />
        ) : (
    <Box style = {{backgroundColor: "#2D4250"}}> 
    <LogoHeader header = "Premier League Dashboard" />
      <Grid container spacing={1} marginRight={1} style = {{backgroundColor: "#2D4250"}}>
        <Grid item xs={8} style = {{backgroundColor: "#2D4250"}}>
          <Item style = {{backgroundColor: "#2D4250"}}><HomeTable 
          // setSelect={setSelect}
          >
            </HomeTable>
          </Item>
        </Grid>
        <Grid item xs={4} style={{height: 600 }}>
          <Grid container  spacing={1}>
            <Grid item xs = {12} style={{  height: "100%" }}>
                <Item style = {{backgroundColor: "#2D4250"}}>
                <Fix_table />
                </Item>
            </Grid>
            <Grid item xs = {12} style={{  height: "100%"  }}>
                <Item style = {{backgroundColor: "#2D4250"}}>
                  
                <BarChart></BarChart>    
                </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
      </Box>
      )}
    
    </>
  );
}


export default GridHome;
