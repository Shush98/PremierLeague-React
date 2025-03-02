import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from "react";
import { Card} from "@mui/material";
import { connect } from 'react-redux';
import {fixRow} from "../action";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  function BarChartFix(props){

//   const [data, setData] = useState([{}]);

//   useEffect(()=>{
//     fetch("/topScorerBar").then(
//       res => res.json()
//     ).then(
//       data =>{
//         setData(data)
//         // setLoading(false);
//         // props.fixData(data)
//         // console.log(props.fix_data)
//       }
//     )
//   },[])

  
  const options = {
    // responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          // This more specific font property overrides the global property
          font: {
              size: 12,
          },
      }
      },
      title: {
        display: true,
        text: 'No. of Titles Home Vs Away',
        color:'white',
        
        
      },
    },
  };
  // 'January', 'February', 'March', 'April', 'May', 'June', 'July'
//   const labels = [];
//   const d = [];
//   data.map((row)=>{
//      labels.push(row.name)
//      d.push(row.goals)
//   })
const labels = [props.fix_row.home_team,props.fix_row.away_team]
const d = [props.fix_row.Home_titles,props.fix_row.Away_titles]
  
  
  const Bardata = {
    labels,
    datasets: [
      {
        label: 'No. Of Titles',
        data: d,
        backgroundColor: 'cyan',
        
      },
    ],
  };

  return (
  <Card
        style={{
          height: 355,
          
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2D4250",
        }}
      >
  <Bar options={options} data={Bardata} />
  </Card>
  );
}


  
const mapStateToProps = state =>{
    return {
      fix_row : state.fix_row
    }
  }

  const mapDispatchToProps = dispatch =>{
    return{
      fixRow : (data) => dispatch(fixRow(data))
    }
  } 
  export default connect(mapStateToProps,mapDispatchToProps)(BarChartFix);