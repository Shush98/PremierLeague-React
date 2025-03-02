import LogoHeader from "./components/LogoHeader";
import Box from '@mui/material/Box';
import Footer from "./components/Footer";
import { connect } from 'react-redux';
import {clubRow,setRating } from "./action";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ClubTable from "./components/ClubTable";
import PlayerTable from "./components/PlayerTable";
import LineChart1 from "./components/LineChart1";
import MatchTimeline from "./components/MatchTimeline";
import Rating from '@mui/material/Rating';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const Logos = [{clubName:'Arsenal FC',Logo:'ArsenalLogo1.png',width:"200px"},
                {clubName:'Manchester City',Logo:'ManCityLogo1.png',width:"200px"},
                {clubName:'Newcastle United',Logo:'NewCastleLogo1.svg',width:"200px"},
                {clubName:'Tottenham Hotspur',Logo:'TotLogo1.svg',width:"100px"},
                {clubName:'Manchester United',Logo:'ManULogo1.png',width:"200px"},
                {clubName:'Liverpool FC',Logo:'LiverpoolLogo1.png',width:"200px"},
                {clubName:'Brighton & Hove Albion',Logo:'BrightonLogo1.svg',width:"200px"},
                {clubName:'Chelsea FC',Logo:'chelsea1.svg',width:"200px"},
                {clubName:'Crystal Palace',Logo:'crystalpalaceLogo1.png',width:"200px"},
                {clubName:'Brentford FC',Logo:'brentfordLogo1.png',width:"200px"},
                {clubName:'Fulham FC',Logo:'fulhamLogo1.png',width:"200px"},
                {clubName:'Aston Villa',Logo:'astonvillaLogo1.png',width:"200px"},
                {clubName:'Leicester City',Logo:'leicestercityLogo1.png',width:"200px"},
                {clubName:'AFC Bournemouth',Logo:'bournemouthLogo1.png',width:"200px"},
                {clubName:'Leeds United',Logo:'leedsunitedLogo1.png',width:"200px"},
                {clubName:'West Ham United',Logo:'westhamLogo1.png',width:"200px"},
                {clubName:'Everton FC',Logo:'evertonLogo1.png',width:"200px"},
                {clubName:'Nottingham Forest',Logo:'nottinghamLogo1.png',width:"200px"},
                {clubName:'Southampton FC',Logo:'southamptonLogo1.png',width:"200px"},
                {clubName:'Wolverhampton Wanderers',Logo:'wolverhamptonLogo1.png',width:"200px"}];

function GridClub(props) {

  const club = Logos.filter((name)=>name.clubName == props.club_row.club_name)[0];
  // console.log(club)
    return <Box style = {{backgroundColor: "#2D4250"}}>
    <LogoHeader header = "Club Dashboard"></LogoHeader>
    <Grid container spacing={1} style = {{backgroundColor: "#2D4250"}}>

    <Grid item xs = {2.5} style = {{backgroundColor: "#2D4250"}}>
    <Item style = {{backgroundColor: "#283C48" , height:250}}>
    <img src={club.Logo} alt="abc_logo" style={{width:club.width , marginLeft:"10px"}} />
    </Item>
    </Grid>
            <Grid item xs = {3.5} style = {{backgroundColor: "#2D4250"}}>
              <Item style = {{backgroundColor: "#283C48" , height:250}}>
              <h1 style={{color:"white",backgroundColor: "#283C48"}}>{props.club_row.club_name}</h1>
              <h3 style={{color:"white",backgroundColor: "#283C48"}}>Stadium :{props.club_row.stadium}</h3>
              <h3 style={{color:"white",backgroundColor: "#283C48"}}>Date of Est. :{props.club_row.date_of_est}</h3>
              <h3 style={{color:"white",backgroundColor: "#283C48"}}>Coach :{props.club_row.coach_name}</h3>
              <h3 style={{color:"white",backgroundColor: "#283C48"}}>No. of Titles :{props.club_row.no_of_titles}</h3>
              </Item>
            </Grid>
            <Grid item xs = {2.5} style = {{backgroundColor: "#2D4250"}}>
              <Item style = {{ height:250,backgroundColor: "#283C48",alignItems:'start'}}>
              <Rating name="read-only" size='large' value={props.rating_data.rating} readOnly style={{paddingTop:70}} />
              <h1 style={{color:"white"}}>{props.rating_data.Pstyle}</h1>
                 {/* <h4 style={{color:"white",paddingRight:15,alignItems:'start'}}>Upcoming Fixtures</h4>
                 <MatchTimeline ></MatchTimeline> */}
              </Item>
            </Grid>
            <Grid item xs = {3.5} style = {{backgroundColor: "#2D4250"}}>
              <Item style = {{backgroundColor: "#283C48",  height:250}}>
                <h4 style={{color:'white'}}>Market Value History in Pounds</h4>
                 <LineChart1></LineChart1>
              </Item>
            </Grid>

        </Grid>
        <Grid container spacing={1} style = {{backgroundColor: "#2D4250"}}>
        <Grid item xs = {8.5} style = {{backgroundColor: "#2D4250"}}>
              <Item style = {{backgroundColor: "#2D4250" }}>
                  <PlayerTable />
              </Item>
            </Grid>
            <Grid item xs = {3.5} style = {{backgroundColor: "#2D4250"}}>
              <Item style = {{backgroundColor: "#283C48" ,height:359,width:445}}>
                
              {/* <Rating name="read-only" size='large' value={props.rating_data.rating} readOnly style={{paddingTop:120}} />
              <h1 style={{color:"white"}}>{props.rating_data.Pstyle}</h1> */}
              <h3 style={{color:"white",paddingRight:15,paddingBottom:20,paddingTop:15,alignItems:'start'}}>Upcoming Fixtures</h3>
              <MatchTimeline></MatchTimeline>
              </Item>
            </Grid>
            </Grid>    
    <Footer />  
</Box>
};

const mapStateToProps = state =>{
    return {
      club_row : state.club_row,
      rating_data : state.rating_data
    }
  }

  const mapDispatchToProps = dispatch =>{
    return{
      clubRow : (data) => dispatch(clubRow(data)),
      setRating : (data) => dispatch(setRating(data))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(GridClub);