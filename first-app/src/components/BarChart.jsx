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
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  function BarChart(){

  const [data, setData] = useState([{}]);

  useEffect(()=>{
    fetch("/topScorerBar").then(
      res => res.json()
    ).then(
      data =>{
        setData(data)
        // setLoading(false);
        // props.fixData(data)
        // console.log(props.fix_data)
      }
    )
  },[])

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top 5 Goal Scorers',
        color:'white'
        
      },
    },
  };
  // 'January', 'February', 'March', 'April', 'May', 'June', 'July'
  const labels = [];
  const d = [];
  data.map((row)=>{
     labels.push(row.name)
     d.push(row.goals)
  })
  
  
  const Bardata = {
    labels,
    datasets: [
      {
        label: 'Goals Scored',
        data: d,
        backgroundColor: 'cyan',
      },
    ],
  };

  return (
  <Card
        style={{
          height: 255,
          
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


  
  export default BarChart;