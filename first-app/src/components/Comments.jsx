import  Toolbar  from "./Toolbar";
import {useState , useEffect} from "react"
import { DataGrid} from "@mui/x-data-grid";
import { Card, CircularProgress, Box, selectClasses } from "@mui/material";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PostComment from "./PostComment";
import {setComment,fixRow } from "../action";
import { connect } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Comments(props) {

    const [select, setSelect] = useState([]);
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

    // const [comment,setComment] = useState("")
    const [isSelected,setSelected] = useState(0);
    const [commentRow,setCommentRow] = useState({});


    useEffect(()=>{
        fetch("/comments").then(
          res => res.json()
        ).then(
          data =>{
            setData(data)
            setLoading(false);
            props.setComment(data);
            // console.log(data)
          }
        )
      },[])

    const handleRowClick =(event) =>{

        setSelected(1);
        setCommentRow(event.row)
        
    }

    const columns = [
        { field: "name", headerName: "Name", width: 300 },
        {
          field: "content",headerName: "Comment",width: "450",
        },
        
    ]


    return (
        <div className="comments">


      {/* Table UI */}
      <Card
        style={{
          height: 350,
          
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "#2D4250",
        }}
      >
        <Grid container>
          <Grid item xs = {4} >
            <Item style = {{backgroundColor: "#2D4250"}}>
               <PostComment></PostComment>
            </Item>
          </Grid>
          <Grid item xs = {8}>
            <Item style = {{backgroundColor: "#2D4250"}}>
        <Toolbar comment_row = {commentRow} SELECTED = {isSelected} ROW = {commentRow} ></Toolbar>
        {loading ? (
          <CircularProgress />
        ) : (
            
          <DataGrid
          slots={{
            columnHeaders: () => null,
          }}
            style={{ width: "100%",height:270, border: "none" }}
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
            rows={props.comment_data.filter(name =>name.match_id == props.fix_row.match_id)}
            columns={columns}
            getRowId={(data) => data.comment_id}
            rowHeight={60}
            rowsPerPageOptions={[3, 5, 8]}
            loading={loading}
            // checkboxSelection
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 3,
                  },
                },
              }}
            pageSizeOptions={[3, 5, 8]}  
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSelectionModelChange={(itm) => setSelect(itm)}
            headerHeight={80}
            disableColumnMenu={true}
            onPageChange={(page) => setPage(page + 1)}
            onRowClick={handleRowClick}
          />
          
        )}
        </Item>
        </Grid>
        </Grid>
      </Card>
    
        </div>
    );

}

const mapStateToProps = state =>{
  return {
    
    fix_row : state.fix_row,
    comment_data : state.comment_data
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    
    setComment : (data) => dispatch(setComment(data)),
    fixRow : (data) => dispatch(fixRow(data))
  }
}  

export default connect(mapStateToProps,mapDispatchToProps)(Comments);