import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { Span } from "app/components/Typography";
import { useEffect, useState, useCallback } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import FileUpload from "react-mui-fileuploader"
import db from '../../../utils/firebase-config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { fil } from "date-fns/locale";
import { async } from "@firebase/util";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const AddCart = () => {
    const [state, setState] = useState({ date: new Date() });
    const [files, setFiles] = useState('')
    const dateFormat = (endDate) => {
        var dateIn = endDate.toISOString().split('T')[0];
        var dateFormated = dateIn.split('-').reverse().join('/');
        return dateFormated;
    }
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const id = Date.now().toString();
    const [URL, setURL] = useState("");
    console.log(URL);
    const storage = getStorage();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFiles(e.target.files[0]);
        }
    }





    // id: id,
    // cus_id: req.body.cus_id,
    // pro_id: req.body.pro_id,
    // quantity: req.body.quantity,
    // status:  "cart",
    const [cus_id, setCus_id] = useState("");
    const [pro_id, setPro_id] = useState("");
    const [quantity, setQuantity] = useState("");
    const [status, setStatus] = useState("cart");
    // /client/addtocart
    const addToCart = async () => {
        try {
            const res = await fetch('http://localhost:3000/client/addtocart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cus_id: cus_id,
                    pro_id: pro_id,
                    quantity: quantity,
                })
            })
            const data = await res.json();
            console.log(data);
            alert("Add to cart successfully");
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
    }, [id]);

    const [loading, setLoading] = useState(false);
    return (
        <div>
            <ValidatorForm onSubmit={addToCart} onError={() => null} loading={loading}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField label="Customer ID" onChange={(e) => setCus_id(e.target.value)} name="name" value={cus_id} validators={["required"]} errorMessages={["this field is required"]} />
                        <TextField label="Product ID" onChange={(e) => setPro_id(e.target.value)} name="model" value={pro_id} validators={["required"]} errorMessages={["this field is required"]} />
                        <TextField label="Quantity" onChange={(e) => setQuantity(e.target.value)} name="price" value={quantity} validators={["required"]} errorMessages={["this field is required"]} />
                    </Grid>
                </Grid>
                <LoadingButton color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add product</Span>
                </LoadingButton>
            </ValidatorForm>
        </div>
    );
};
export default AddCart;
