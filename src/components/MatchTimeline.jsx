import Timeline from '@mui/lab/Timeline';
import TimelineItem ,{timelineItemClasses,} from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import {clubRow} from "../action";
import React, { useState, useEffect } from "react";


const Logos = [{clubName:'Arsenal FC',Logo:'ArsenalLogo1.png',width:"30px"},
{clubName:'Manchester City',Logo:'ManCityLogo1.png',width:"30px"},
{clubName:'Newcastle United',Logo:'NewCastleLogo1.svg',width:"30px"},
{clubName:'Tottenham Hotspur',Logo:'TotLogo1.svg',width:"20px"},
{clubName:'Manchester United',Logo:'ManULogo1.png',width:"30px"},
{clubName:'Liverpool FC',Logo:'LiverpoolLogo1.png',width:"30px"},
{clubName:'Brighton & Hove Albion',Logo:'BrightonLogo1.svg',width:"30px"},
{clubName:'Chelsea FC',Logo:'chelsea1.svg',width:"30px"},
{clubName:'Crystal Palace',Logo:'crystalpalaceLogo1.png',width:"30px"},
{clubName:'Brentford FC',Logo:'brentfordLogo1.png',width:"30px"},
{clubName:'Fulham FC',Logo:'fulhamLogo1.png',width:"30px"},
{clubName:'Aston Villa',Logo:'astonvillaLogo1.png',width:"30px"},
{clubName:'Leicester City',Logo:'leicestercityLogo1.png',width:"30px"},
{clubName:'AFC Bournemouth',Logo:'bournemouthLogo1.png',width:"30px"},
{clubName:'Leeds United',Logo:'leedsunitedLogo1.png',width:"30px"},
{clubName:'West Ham United',Logo:'westhamLogo1.png',width:"30px"},
{clubName:'Everton FC',Logo:'evertonLogo1.png',width:"30px"},
{clubName:'Nottingham Forest',Logo:'nottinghamLogo1.png',width:"30px"},
{clubName:'Southampton FC',Logo:'southamptonLogo1.png',width:"30px"},
{clubName:'Wolverhampton Wanderers',Logo:'wolverhamptonLogo1.png',width:"30px"}];

function MatchTimeline(props){

  const [data,setData] = useState([{}]);

  useEffect(()=>{
    fetch("/clubData").then(
      res => res.json()
    ).then(
      data =>{
        // setLoading(false);
        setData(data)
        // console.log(props.fix_data)
      }
    )
  },[])


    return (
        <Timeline 
        sx={{
            [`& .${timelineItemClasses.root}`]: {
              flex: 0,
              padding: 0,
              paddingRight:15
            },
          }}>
            {data.filter(name => name.home_team == props.club_row.club_name).slice(0,3).map((row)=> 

            
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector style={{height:0}} />
          <img src={Logos.filter((name)=>name.clubName == row.away_team)[0]['Logo']} alt="abc_logo" style={{width:Logos.filter((name)=>name.clubName == row.away_team)[0]['width']}} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent >
          <Typography  color="white" fontSize={14}>
            {row.away_team}
          </Typography>
        </TimelineContent>
      </TimelineItem>

        )}
      
    </Timeline>
    )
}

const mapStateToProps = state =>{
  return {
    club_row : state.club_row
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    
    clubRow : (data) => dispatch(clubRow(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MatchTimeline);