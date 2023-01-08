import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Stack,
    Fab,
    DialogContentText,
    DialogContent,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { SimpleCard } from "app/components";
import { useState, useEffect } from "react";

const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));
const ContentBox = styled("div")(() => ({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
}));
const FabIcon = styled(Fab)(() => ({
    width: "44px !important",
    height: "44px !important",
    boxShadow: "none !important",
}));

///admin/getall
const CustomerTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    function handleClickOpen() {
        setOpen(true);
        console.log("open");
    }

    function handleClose() {
        setOpen(false);
    }

    const [cus, setCus] = useState([]);

    const getAllCustomers = async () => {
        fetch('http://localhost:3000/admin/getallcustomer').then((response) => {
            response.json().then((result) => {
                setCus(result);
                console.log(result);
            });
        });
    };
    // const state = {
    //     name: "",
    //     model: "",
    //     price: "",
    //     description: "",
    //     quantity: "",
    //     endDate: ""
    // };
    const [name, setName] = useState("");
    const [model, setPhone] = useState("");
    const [price, setEmail] = useState("");
    const [description, setAddress] = useState("");
    const [password, setPassword] = useState("");
    ///admin/deleteproducts/:id
    const deleteCus = async (id) => {
        //confirm("Are you sure you want to delete this product?");
        if (window.confirm("Are you sure you want to delete this product?"))
            try {
                fetch('http://localhost:3000/admin/deletecustomer/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((response) => {
                    response.json().then((result) => {
                        console.log(result);
                        getAllCustomers();
                    });
                });
            } catch (error) {
                console.log(error);
            }
        else {
            console.log("not deleted");
        }

    };
    // const updateProduct = async (id) => {
    //     if (window.confirm("Are you sure you want to update this product?"))
    //         try {
    //             fetch('http://localhost:3000/admin/updateproducts/' + id, {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(
    //                     {
    //                         name: name,
    //                         model: model,
    //                         price: price,
    //                         description: description,
    //                         quantity: quantity,
    //                         endDate: endDate
    //                     })
    //             }).then((response) => {
    //                 response.json().then((result) => {
    //                     console.log(result);
    //                     getAllProducts();
    //                 })
    //             });
    //             alert("Product Updated Successfully");
    //             handleClose();
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     else {
    //         console.log("not update");
    //     }
    // }
    // /admin/getproducts/:id and use handleClickOpen
    const [data, setData] = useState([]);
    const getCusDetails = async (id) => {
        console.log(id);
        fetch('http://localhost:3000/admin/getcustomer/' + id).then((response) => {
            response.json().then((result) => {
                console.log(result);
                setData(result);
                setName(result.cus_name);
                setPhone(result.cus_phone);
                setEmail(result.cus_email);
                setAddress(result.cus_address);
                setPassword(result.cus_password);
                handleClickOpen();
            });
        });
    };


    useEffect(() => {
        getAllCustomers();
        console.log(cus);
    }, []);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box width="100%" overflow="auto">
            <Button variant="contained" color="primary" onClick={() => getAllCustomers()} >ReFresh</Button>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cus
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((subscriber, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{subscriber.id}</TableCell>
                                <TableCell align="center">{subscriber.cus_name}</TableCell>
                                <TableCell align="center">{subscriber.cus_address}</TableCell>
                                <TableCell align="center">{subscriber.cus_phone}</TableCell>
                                <TableCell align="center">{subscriber.cus_email}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => deleteCus(`${subscriber.id}`)}>
                                        <Icon color="error">close</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => getCusDetails(`${subscriber.id}`)}>
                                        <Icon color="primary">search</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={cus.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ "aria-label": "Next Page" }}
                backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
            <Dialog open={open} onClose={handleClose}>
                <SimpleCard title='Customer Details'>
                    <TextField
                        autoFocus margin="dense" id="name" label="Name" type="text" fullWidth variant="standard" value={name}  />
                    <TextField
                        autoFocus margin="dense" id="model" label="Model" type="text" fullWidth variant="standard" value={model}  />
                    <TextField
                        autoFocus margin="dense" id="price" label="Price" type="text" fullWidth variant="standard" value={price}  />
                    <TextField
                        autoFocus margin="dense" id="description" label="Description" type="text" fullWidth variant="standard" value={description} />
                    
                </SimpleCard>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    
                </DialogActions>
            </Dialog>

           
        </Box>
    );
};

export default CustomerTable;
