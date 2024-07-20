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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './css/Expanse.css';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '10px',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Expanse = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [editdata, setEditdata] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [date, setDate] = useState([]);
    const [newcategory, setNewCategory] = useState();
    const [value, setValue] = useState({
        date: null,
        amount: "",
        category: "",
        description: ""
    })
    console.log(value);
    console.log(date);
    console.log(editdata);
    const fetchExpanse = async () => {
        try {
            const response = await instance.get('/getExpense');
            console.log(response.data.Expenses);
            setData(response.data.Expenses);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchCategory = async () => {
        try {
            const response = await instance.get('/getCategory');
            console.log(response.data.category);
            setCategory(response.data.category);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchExpanse();
        fetchCategory();
    }, [])
    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await instance.post('/createExponse', value);
            console.log(response.data);
            fetchExpanse();
            fetchCategory();
            handleClose();
            toast.success("Expanse Created Successfully");

        } catch (error) {
            console.error(error);
        }
    }
    const HandleUpdate = async (e) => {
        e.preventDefault()
        try {
            const response = await instance.post(`/updateExpanse/${value?._id}`, value);
            console.log(response.data);
            fetchExpanse();
            fetchCategory();
            setModel(false);
            toast.success("Expanse Updated Successfully");

        } catch (error) {
            console.error(error);
        }
    }
    const HandleDelete = async (e) => {
        e.preventDefault()
        try {
            const response = await instance.post(`/deleteExpanse/${value?._id}`);
            console.log(response.data);
            fetchExpanse();
            fetchCategory();
            toast.success("Expanse Deleted Successfully");
        } catch (error) {
            console.error(error);
        }
    }
    const handleCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/createCategory', newcategory);
            console.log(response.data);
            fetchCategory();
            setDialog(false);
            toast.success("Category Created Successfully");

            // setCategory(response.data);
        } catch (error) {
            console.error(error);

        }
    }

    console.log("catgory", value?.category._id);

    return (
        <div>
            <div className='add_Expanse_button'>
                <h1>Expanse</h1>
                <div>
                    <Button variant='outlined' onClick={handleOpen} style={{ height: "50px", marginRight: "10px" }} >Add Expanse</Button>
                    <Button variant='outlined' onClick={() => { setDialog(true) }} style={{ height: "50px" }} >Add custom Category</Button>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div className='popup_Dialog'>
                        <h1>Add Expanse</h1>
                        <form onSubmit={HandleSubmit} className='popup_Dialog'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Date" onChange={(newValue) => setValue({ ...value, date: new Date(newValue).toLocaleDateString('en-GB').split('/').reverse().join('-') })} required />
                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField id="outlined-basic" type='number' onChange={(e) => { setValue({ ...value, amount: e.target.value }) }} label="Amount" variant="outlined" required />
                            {/* <TextField id="outlined-basic" label="Category" variant="outlined" /> */}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Category"
                                    onChange={(e) => setValue({ ...value, category: e.target.value })}
                                    required
                                >
                                    {category ? category.map(item => (
                                        <MenuItem key={item._id} value={item._id}>
                                            {item.name}
                                        </MenuItem>
                                    )) : ""}
                                </Select>
                            </FormControl>
                                    
                            <TextField id="outlined-basic" label="Description" onChange={(e) => { setValue({ ...value, description: e.target.value }) }} variant="outlined" required />
                            <Button variant="contained" type='submit'>submit</Button>
                        </form>
                    </div>
                </Box>
            </Modal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell align="center">Amount</StyledTableCell>
                            <StyledTableCell align="center">Category</StyledTableCell>
                            <StyledTableCell align="center">Description</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length ? data.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {new Date(row.date).toLocaleDateString()}

                                </StyledTableCell>
                                <StyledTableCell align="center">{row?.amount}</StyledTableCell>
                                <StyledTableCell align="center">{row?.category?.name}</StyledTableCell>
                                <StyledTableCell align="center">{row?.description}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <EditIcon onClick={() => { setModel(true); setValue(row) }} />
                                    <DeleteIcon onClick={HandleDelete} />
                                </StyledTableCell>
                            </StyledTableRow>
                        )) : "No Data Found"}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={model}
                onClose={() => { setModel(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div className='popup_Dialog'>
                        <h1>Edit Expanse</h1>
                        <form onSubmit={HandleUpdate} className='popup_Dialog'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Date" value={dayjs(value?.date)} onChange={(newValue) => setValue({ ...value, date: new Date(newValue.$d).toLocaleDateString('en-GB').split('/').reverse().join('-') })} renderInput={(params) => <TextField {...params} />} />

                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField id="outlined-basic" type='number' value={value?.amount} onChange={(e) => { setValue({ ...value, amount: e.target.value }) }} label="Amount" variant="outlined" />
                            {/* <TextField id="outlined-basic" label="Category" variant="outlined" /> */}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value?.category._id}
                                    label="Category"
                                    onChange={(e) => setValue({ ...value, category: e.target.value })}
                                >
                                    {category ? category.map(item => (
                                        <MenuItem key={item._id} value={item._id}>
                                            {item.name}
                                        </MenuItem>
                                    )) : ""}
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Description" value={value?.description || ""} onChange={(e) => { setValue({ ...value, description: e.target.value }) }} variant="outlined" />
                            <Button variant="contained" type='submit'>submit</Button>
                        </form>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={dialog}
                onClose={() => { setDialog(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div className='popup_Dialog'>
                        <h1>Add Custom Category</h1>
                        <form onSubmit={handleCategory} className='popup_Dialog'>

                            <TextField id="outlined-basic" label="Category Name" value={newcategory?.name || ""} onChange={(e) => { setNewCategory({ name: e.target.value }) }} variant="outlined" required />
                            <Button variant="contained" type='submit'>submit</Button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Expanse
