import React, { useState, useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { Card, CircularProgress, Box, selectClasses } from "@mui/material";
import { connect } from 'react-redux';
import {changeAVAL , clubRow , playerRow,setRating} from "../action";
import axios from "axios";


const columns = [
  { field: "name", headerName: "Player Name", width: 200 },
  
  { field: "age", headerName: "Age", width: 50 },
  { field: "position", headerName: "Position", width: 250 },
  { field: "height", headerName: "Height", width: 70 },
  {
    field: "foot",headerName: "Foot",width: 70,
  },
  { field: "citizenship", headerName: "Country", width: 150 },
  { field: "goals", headerName: "Goals", width: 70 },
  { field: "assists", headerName: "Assists", width: 70 },
  {
    field: "appearance",headerName: "Appearance",width: 100,
  },
  
  
  
];

function HomeTable(props) {
  
  const [select, setSelect] = useState([]);
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [rate,setRate] = useState(0);
  const [Pstyle,setPstyle] = useState('');

  

  useEffect(()=>{
    fetch("/playerData").then(
      res => res.json()
    ).then(
      data =>{
        setData(data)
        setLoading(false);
        // console.log(data)
      }
    )
  },[])

//   console.log(props.player_row)

  const handleRowClick= (event)=>{
    // console.log(event.row)
    props.playerRow(event.row)

    axios.post('/PlayerRating',{
      player_id:event.row.player_id
    },
    {headers:{'Content-Type':"application/json"}}).then((response) => {
      setRate(response.data)
   });

   axios.post('/PlayerStyle',{
    player_id:event.row.player_id
  },
  {headers:{'Content-Type':"application/json"}}).then((response) => {
    setPstyle(response.data)
 });
 setTimeout(() => {
 props.setRating({rating:rate,Pstyle:Pstyle})},300);


  
  };
     
  

  return (
    <>
      {/* Table UI */}
      <Card
        style={{
          height: 359,
          
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2D4250",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
            
          <DataGrid
            style={{ width: "60%", border: "none" }}
            sx={{
              "& .MuiTablePagination-root": {
                color: "white",
                width: "100%",
              },
              "& .MuiDataGrid-cell": {
                color: "white",
                borderBottom: "1.5px solid #B3B7BA",
                justifyContent: "left",
                
              },
              "& .MuiButtonBase-root.MuiIconButton-root": {
                color: "white",
              },
              "& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
                color: "#808080",
              },
              ".MuiDataGrid-row.Mui-selected": {
                backgroundColor: "#1D2B34",
                color: "white",
              },
              ".MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: "#1D2B34",
                color: "white",
              },
              "& .MuiCheckbox-root": {
                color: "white",
              },
              "& .MuiCheckbox-root.Mui-checked": {
                color: "white",
              },
              "& .MuiDataGrid-row:hover": {
                color: "white",
                backgroundColor: "#1D2B34",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#283C48",
                color: "white",
                borderBottom: "2px solid #B3B7BA",
              },
              "& .MuiDataGrid-columnSeparator": {
                color: "transparent",
              },
              "& .MuiDataGrid-selectedRowCount": {
                color: "white",
                width:"20%",
                position: "absolute",
              },
              "& .MuiDataGrid-columnHeadersInner": {
                marginLeft: {lg:"4px"},
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#283C48",
              },
              "& .MuiSvgIcon-root.MuiSelect-icon": {
                color: "white",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                textOverflow: "clip",
                whiteSpace: "break-spaces",
                lineHeight: 1.8,
              },
              "& .MuiTablePagination-actions": {
                position: {lg: "absolute"},
                left: "50%",
                transform: {lg: "translateX(-50%)"},
                width: {lg:"12%"},
                marginLeft: {xs:2, lg:0},
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
              "& .MuiTablePagination-displayedRows": {
                marginRight:{lg:2}
              },  
            }}
            rows={data.filter(name => name.club_id == props.club_row.club_id)}
            columns={columns}
            getRowId={(data) => data.player_id}
            rowHeight={36}
            rowsPerPageOptions={[10, 15, 25]}
            loading={loading}
            // checkboxSelection
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
            pageSizeOptions={[10,15,25]}  
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSelectionModelChange={(itm) => setSelect(itm)}
            headerHeight={80}
            disableColumnMenu={true}
            onPageChange={(page) => setPage(page + 1)}
            onRowClick={(data) =>handleRowClick(data)}
          />
          
        )}
      </Card>
      {/* {loading === true ? null : (
        <Box
          sx={{
            color: "white",
            position: "flex",
            left: "49%",
            bottom:"40%",
            zIndex: 10,
            visibility: { xs: "hidden", lg: "visible" },
          }}
        >
          {page} of {(data.length / pageSize).toFixed(0)}
        </Box>
      )} */}
      
    </>
  );
}
const mapStateToProps = state =>{
  return {
    A_val : state.A_val,
    club_row : state.club_row,
    player_row : state.player_row,
    rating_data : state.rating_data
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    set_Aval : (data) => dispatch(changeAVAL(data)),
    clubRow : (data) => dispatch(clubRow(data)),
    playerRow : (data) => dispatch(playerRow(data)),
    setRating : (data) => dispatch(setRating(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeTable);
