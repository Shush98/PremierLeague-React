import React, { useState, useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { Card, CircularProgress, Box, selectClasses } from "@mui/material";
import { connect } from 'react-redux';
import {changeAVAL , clubRow, mvData} from "../action";
import {useNavigate} from 'react-router-dom';

const columns = [
  { field: "rank", headerName: "Rank", width: 70 },
  {
    field: "club_name",headerName: "Club Name",width: "150",
  },
  { field: "club_id", headerName: "Club ID", width: 70 },
  { field: "win", headerName: "Win", width: 70 },
  { field: "draw", headerName: "Draw", width: 70 },
  {
    field: "lose",headerName: "Loss",width: "70",
  },
  { field: "goal_for", headerName: "GF", width: 70 },
  { field: "goal_against", headerName: "GA", width: 70 },
  { field: "goal_diff", headerName: "GD", width: 70 },
  {
    field: "matches",headerName: "Matches",width: "70",
  },
  { field: "points", headerName: "Points", width: 70 },
  
  
];

function HomeTable(props) {
  
  const [select, setSelect] = useState([]);
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  

  useEffect(()=>{
    fetch("/standings").then(
      res => res.json()
    ).then(
      data =>{
        setData(data)
        setLoading(false);
        // console.log(data)
      }
    )
  },[])

  useEffect(()=>{
    fetch("/mvData").then(
      res => res.json()
    ).then(
      data =>{
        props.mvData(data)
        // console.log(props.player_row)
        // console.log(data)
      }
    )
  },[])

  const Nav = useNavigate();

  const handleRowClick= (event)=>{
    // console.log(event.row)
    props.clubRow(event.row)
    Nav('/club-dashboard');
  };
     
  

  return (
    <>
      {/* Table UI */}
      <Card
        style={{
          height: 635,
          
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
            rows={data}
            columns={columns}
            getRowId={(data) => data.club_id}
            rowHeight={36}
            rowsPerPageOptions={[15, 25, 35]}
            loading={loading}
            // checkboxSelection
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 15,
                  },
                },
              }}
            pageSizeOptions={[15,25,35]}  
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSelectionModelChange={(itm) => setSelect(itm)}
            headerHeight={80}
            disableColumnMenu={true}
            onPageChange={(page) => setPage(page + 1)}
            onRowClick={handleRowClick}
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
    mv_data : state.mv_data
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    set_Aval : (data) => dispatch(changeAVAL(data)),
    clubRow : (data) => dispatch(clubRow(data)),
    mvData : (data) => dispatch(mvData(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeTable);
