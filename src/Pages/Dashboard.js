import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import instance from '../Utils/api';
import './css/Dashboard.css';
import Button from '@mui/material/Button';
import camelCase from 'camelcase';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#9fc3f7",
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#f8fbff",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState();
  const [value1, setValue1] = useState();


  const handlefilter = async () => {
    try {
      const response = await instance.get('/spending_by_categoury');
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchCategory = async () => {
    try {
      const response = await instance.get('/getCategory');
      console.log(response.data.category);
      setCategory(response.data.category);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePeriod = async () => {
    try {
      const response = await instance.post(`/totalPeriod/${value.period}`);
      console.log(response);
      setValue1(response.data.total);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    handlePeriod();
  }, [value])
  useEffect(() => {
    handlefilter();
    fetchCategory();

  }, [])
  console.log(value);
  return (
    <div>
      {/* <h1>Dashboard</h1> */}
      <div className='Dashboard'>
        <div className='left'>
          <h2>Spending by Category</h2>
          <TableContainer component={Paper} style={{ width: "100%", overflow: "hidden" }}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell >Total Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length ? data.map((row) => (
                  <StyledTableRow key={row._id}>

                    <StyledTableCell >{row?._id}</StyledTableCell>
                    <StyledTableCell >{row?.totalAmount}</StyledTableCell>

                  </StyledTableRow>
                )) : "No Data Found"}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='right'>
          <h2>Category List</h2>
          <TableContainer component={Paper} style={{ width: "100%", overflow: "hidden" }}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell >Name</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {category.length ? category.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell >{row?.name}</StyledTableCell>
                  </StyledTableRow>
                )) : "No Data Found"}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <h2>Period wise Expenses</h2>
          <Button variant='outlined' onClick={(e) => { setValue({ period: 'daily' }) }} style={{ height: "40px", marginRight: "5px" }} >Daily</Button>
          <Button variant='outlined' onClick={(e) => { setValue({ period: 'weekly' }) }} style={{ height: "40px", marginRight: "5px" }} >Weekly</Button>
          <Button variant='outlined' onClick={(e) => { setValue({ period: 'monthly' }) }} style={{ height: "40px" }} >Monthly</Button>
          <div>
            <h2>{value ?  camelCase(value.period, {pascalCase: true, preserveConsecutiveUppercase: true}) : ""} Expanse : {value1 ? value1 : 0 }RS</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
