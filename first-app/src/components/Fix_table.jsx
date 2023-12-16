import React, { useState, useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { Card, CircularProgress, Box, selectClasses } from "@mui/material";
import { connect } from 'react-redux';
import {fixData , fixRow} from "../action";
import {useNavigate} from 'react-router-dom';

const columns = [
  { field: "home_team", headerName: "Home", width: 200 },
  { field: "vs",headerName: "",width: 80,},
  { field: "away_team", headerName: "Away", width: 200 },
];

function Fix_table(props) {
  
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  

  useEffect(()=>{
    fetch("/fixtures").then(
      res => res.json()
    ).then(
      data =>{
        setLoading(false);
        props.fixData(data)
        // console.log(props.fix_data)
      }
    )
  },[])

  const Nav = useNavigate();

  const handleRowClick= (event)=>{
    props.fixRow(event.row)
    // console.log(event.row)
    Nav('/fixture-dashboard');
    console.log(props.fix_row)

  };

  

  return (
    <>
      {/* Table UI */}
      <Card
        style={{
          height: 358,
          
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
            style={{ width: "30%", border: "none" }}
            sx={{
              "& .MuiTablePagination-root": {
                color: "white",
                width: "100%",
              },
              "& .MuiDataGrid-cell": {
                color: "white",
                borderBottom: "1.5px solid #B3B7BA",
                justifyContent: "center",
                
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
                justifyContent: "right"
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
                left: "10%",
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
            rows={props.fix_data}
            columns={columns}
            getRowId={(data) => data.match_id}
            rowHeight={35.5}
            rowsPerPageOptions={[7,10]}
            loading={loading}
            // checkboxSelection
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 7,
                  },
                },
              }}
            pageSizeOptions={[7,10]}  
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSelectionModelChange={(itm) => setSelect(itm)}
            headerHeight={80}
            disableColumnMenu={true}
            onPageChange={(page) => setPage(page + 1)}
            onRowClick={(data)=>handleRowClick(data)}
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
    fix_data : state.fix_data,
    fix_row : state.fix_row
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    fixData : (data) => dispatch(fixData(data)),
    fixRow : (data) => dispatch(fixRow(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Fix_table);
