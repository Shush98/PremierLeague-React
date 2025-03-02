
import { LineChart } from '@mui/x-charts/LineChart';
import React, { useState, useEffect } from "react";




import { connect } from 'react-redux';
import {changeAVAL , playerRow , mvData} from "../action";



function LineChart1(props) {

  // const [data, setData] = useState([{}]);
  
  
  const mv_date = []
  
  const mv = []
     
  // useEffect(()=>{
  //   fetch("/mvData").then(
  //     res => res.json()
  //   ).then(
  //     data =>{
  //       setData(data)
  //       // console.log(props.player_row)
  //       // console.log(data)
  //     }
  //   )
  // },[])
  // console.log(props.player_row)
    //   data ? (data.filter(name => name.player_id == props.player_row.player_id).map(n =>{
    //       mv_date.push(n.mv_date)
    //       mv.push(n.mv)
    //  })):(mv_date = [1,2,3,4] ,
    //   mv = [8,3,6,1])

    props.mv_data.filter(name => name.player_id == props.player_row.player_id).map(n =>{
            mv_date.push( new Date(n.mv_date))
            mv.push(n.mv)})
    
    
     
     console.log(props.player_row)
     console.log(props.mv_data)
    console.log(mv_date)
    console.log(mv)


    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' ,
        },
        title: {
          display: true,
          text: props.player_row.name,
          color:'white'
        },
      },
    };
    
    const labels = mv_date;
    
    const Da = {
      labels,
      datasets: [
        {
          label: 'Market Value History',
          color :"white",
          data: mv,
          borderColor: 'white',
          backgroundColor: 'cyan',
        }
      ],
    };
    
    
    
      return (
        <div className="line" >
          

          <LineChart

            sx={{
              "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                strokeWidth:"0.4",
                fill:"white"
               },
               // change all labels fontFamily shown on both xAxis and yAxis
               "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                   fontFamily: "Roboto",
                },
                // change bottom label styles
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                    strokeWidth:"0.5",
                    fill:"white"
                 },
                  // bottomAxis Line Styles
                 "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                  stroke:"white",
                  strokeWidth:0.4
                 },
                 // leftAxis Line Styles
                 "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                  stroke:"white",
                  strokeWidth:0.4
                 }
            }}
           xAxis={[{ data:mv_date , scaleType:'time' }]}
           series={[
           {
             data: mv,
            // showMark: ({ index }) => index % 2 === 0,
            color:"cyan"
           },
           
                  ]}
            
                
            // width={500}
            height={220}
           />

        </div>
      );
    }
    
    const mapStateToProps = state =>{
      return {
        A_val : state.A_val,
        player_row : state.player_row,
        mv_data : state.mv_data

      }
    }
    
    const mapDispatchToProps = dispatch =>{
      return{
        set_Aval : (data) => dispatch(changeAVAL(data)),
        playerRow : (data => dispatch(playerRow(data))),
        mvData : (data => dispatch(mvData(data)))
      }
    }
    
    export default connect(mapStateToProps,mapDispatchToProps)(LineChart1);




// export function App() {
//   return <Line options={options} data={data} />;
// }


