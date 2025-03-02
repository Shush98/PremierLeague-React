import LogoHeader from "./components/LogoHeader";
import Box from '@mui/material/Box';
import Footer from "./components/Footer";
import { connect } from 'react-redux';
import {fixRow} from "./action";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import BarChartFix from "./components/BarChartFix";
import Comments from "./components/Comments";

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

function GridFixture(props) {



    const HomeLogo = Logos.filter((name)=>name.clubName == props.fix_row.home_team)[0];
    const AwayLogo = Logos.filter((name)=>name.clubName == props.fix_row.away_team)[0];
    return <Box style = {{backgroundColor: "#2D4250"}}>
        <LogoHeader header = "Fixture Dashboard"></LogoHeader>
        <Grid container spacing={1} style = {{backgroundColor: "#2D4250"}}>
        <Grid item xs = {2} style = {{backgroundColor: "#2D4250"}}>
              <Item style = {{backgroundColor: "#283C48" , height:355}}>
              <img src={HomeLogo.Logo} alt="abc_logo" style={{width:HomeLogo.width, marginLeft:"2px",paddingTop:50}} />
              </Item>
            </Grid>
            <Grid item xs = {4} style = {{backgroundColor: "#2D4250"}}>
              <Item style = {{backgroundColor: "#283C48" , height:355}}>
              <h1 style={{color:"white",backgroundColor: "#283C48",fontSize:45}}>{props.fix_row.result}</h1>
              <h2 style={{color:"white",backgroundColor: "#283C48"}}>{props.fix_row.home_team} Vs {props.fix_row.away_team}</h2>
              <h3 style={{color:"white",backgroundColor: "#283C48"}}>{props.fix_row.ref_name}</h3>
              <h3 style={{color:"white",backgroundColor: "#283C48"}}>{props.fix_row.stadium}</h3>
              <h3 style={{color:"white",backgroundColor: "#283C48"}}>{props.fix_row.date}</h3>
              </Item>
            </Grid>
            <Grid item xs = {2} style = {{backgroundColor: "#2D4250"}}>
              <Item style = {{backgroundColor: "#283C48" , height:355}}>
              <img src={AwayLogo.Logo} alt="abc_logo" style={{width:AwayLogo.width, marginLeft:"2px",paddingTop:50}} />
              </Item>
            </Grid>
            <Grid item xs = {4} style = {{backgroundColor: "#2D4250"}}>
              <Item style = {{backgroundColor: "#283C48" , height:355}}>
                 <BarChartFix />
              </Item>
            </Grid>

       

        <Grid item xs = {12} style = {{backgroundColor: "#2D4250"}}>
          <Item style={{height:350,backgroundColor:'#283C48'}}>
          <Comments></Comments>
          </Item>
        </Grid>
        </Grid>
        <Footer />
    </Box>
};

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

export default connect(mapStateToProps,mapDispatchToProps)(GridFixture);