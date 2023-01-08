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
const CheckOut = () => {
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

    const [products, setProducts] = useState([]);
// /http://localhost:3000/client/getcart
    const getCart = async (id) => {
       try {
         fetch('http://localhost:3000/client/getcart/' + id).then((response) => {
              response.json().then((result) => {
                 console.log(result);
                    setProducts(result);
                });
            });
       } catch (error) {
        console.log(error);
       }
    };

    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [endDate, setEndDate] = useState("");
    ///client/deletecart/:id
    const deleteCart = async (id) => {
        //confirm("Are you sure you want to delete this product?");
        if (window.confirm("Are you sure you want to delete this product?"))
            try {
                fetch('http://localhost:3000/client/deletecart/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((response) => {
                    response.json().then((result) => {
                        console.log(result);
                        getCart();
                    });
                });
            } catch (error) {
                console.log(error);
            }
        else {
            console.log("not deleted");
        }

    };
    // /client/updatecart/:id
    const updateProduct = async (id) => {
        if (window.confirm("Are you sure you want to update this product?"))
            try {
                fetch('http://localhost:3000/client/updatecart/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            quantity: quantity,
                        })
                }).then((response) => {
                    response.json().then((result) => {
                        console.log(result);
                        getCart();
                    })
                });
                alert("Product Updated Successfully");
                handleClose();
            } catch (error) {
                console.log(error);
            }
        else {
            console.log("not update");
        }
    }
    // /admin/getproducts/:id and use handleClickOpen
    // /client/getcartbyid/:id
    const [data, setData] = useState([]);
    const getProduct = async (id) => {
        console.log(id);
        fetch('http://localhost:3000/client/getcartbyid/' + id).then((response) => {
            response.json().then((result) => {
                console.log(result);
                setData(result);
                setQuantity(result.quantity);
                handleClickOpen();
            });
        });
    };
    ///client/checkout/:cus_id
    // /client/checkout/:cus_id
    const checkOut = async (id) => {
        if (window.confirm("Are you sure you want to check out?"))
            try {
                fetch('http://localhost:3000/client/checkout/' + id, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }).then((response) => {
                    response.json().then((result) => {
                        console.log(result);
                        getCart();
                    });
                });
                alert("Check Out Successfully");
            } catch (error) {
                console.log(error);
            }
        else {
            console.log("not update");
        }
    }

    useEffect(() => {
        getCart();
        console.log(products);
    }, [id]);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [id, setId] = useState("");
    return (
        <Box width="100%" overflow="auto">
            <TextField
                fullWidth label="Customer ID" variant="outlined"  style={{ marginBottom: "1rem" }} 
                onChange={(e) => setId(e.target.value)}
                />
            <Button variant="contained" color="primary" onClick={() => getCart(id)} >Get Cart</Button>
            <Button variant="contained" color="primary" onClick={() => checkOut(id)} style={{ marginLeft: '0.8rem' }}>Check-Out</Button>
 
            {/*filter search text */}


            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Customer ID</TableCell>
                        <TableCell align="center">Product ID</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((subscriber, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{subscriber.id}</TableCell>
                                <TableCell align="center">{subscriber.cus_id}</TableCell>
                                <TableCell align="center">{subscriber.pro_id}</TableCell>
                                <TableCell align="center">{subscriber.quantity}</TableCell>
                                <TableCell align="center">{subscriber.status}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => deleteCart(`${subscriber.id}`)}>
                                        <Icon color="error">close</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => getProduct(`${subscriber.id}`)}>
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
                count={products.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ "aria-label": "Next Page" }}
                backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Product</DialogTitle>
                <SimpleCard title="Product Details">
                    {/*get data and TextField to type new data */}
                    <TextField
                        autoFocus margin="dense" id="quantity" label="Quantity" type="text" fullWidth variant="standard" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </SimpleCard>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => updateProduct(`${data.id}`)} color="secondary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <Stack spacing={2} direction="row">
                    <SimpleCard title="Product Details">
                        <div>
                            <TextField id="outlined-basic" label="Name" variant="outlined" value={data.name} onChange={(e) => state.name = e.target.value} />
                            <TextField id="outlined-basic" label="Model" variant="outlined" value={data.model} onChange={(e) => state.model = e.target.value} />
                            <TextField id="outlined-basic" label="Price" variant="outlined" value={data.price} onChange={(e) => state.price = e.target.value} />
                            <TextField id="outlined-basic" label="Description" variant="outlined" value={data.description} onChange={(e) => state.description = e.target.value} />
                            <TextField id="outlined-basic" label="Quantity" variant="outlined" value={data.quantity} onChange={(e) => state.quantity = e.target.value} />
                            <TextField id="outlined-basic" label="End Date" variant="outlined" value={data.endDate} onChange={(e) => state.endDate = e.target.value} />

                        </div>
                    </SimpleCard>
                </Stack>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Box>
    );
};

export default CheckOut;
