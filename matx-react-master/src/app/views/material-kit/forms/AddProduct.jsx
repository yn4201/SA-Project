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

const AddProduct = () => {
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
    const [quantity, setQuantity] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const id = Date.now().toString();
    const [URL, setURL] = useState("");
    console.log(URL);
    const storage = getStorage();
    // const [file, setFile] = useState(null);

    // const handleChange = async (e) => {
    //     if (e.target.files[0])
    //         setFile(e.target.files[0]);
    // }

    // const handleUpload = async (e) => {
    //     e.preventDefault();
    //     const storageRef = ref(storage, file.name);
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     uploadTask.on('state_changed',
    //         (snapshot) => {
    //             // Observe state change events such as progress, pause, and resume
    //             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             console.log('Upload is ' + progress + '% done');
    //             switch (snapshot.state) {
    //                 case 'paused':
    //                     console.log('Upload is paused');
    //                     break;
    //                 case 'running':
    //                     console.log('Upload is running');
    //                     break;
    //             }
    //         },
    //         (error) => {
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 console.log('File available at', downloadURL);
    //                 setURL(downloadURL);
    //                 fetch("http://localhost:3000/admin/addproducts", {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify({
    //                         id: id,
    //                         name: name,
    //                         model: model,
    //                         price: price,
    //                         quantity: quantity,
    //                         endDate: dateFormat(endDate),
    //                         description: description,
    //                         image: downloadURL,
    //                     }),
    //                 })
    //                     .then((res) => res.json())
    //                     .then((data) => {
    //                         setLoading(false);
    //                         setName('');
    //                         setModel('');
    //                         setPrice('');
    //                         setQuantity('');
    //                         setEndDate('');
    //                         setDescription('');
    //                         setFiles([]);
    //                     });
    //             });
    //         }
    //     );
    //     setLoading(false);
    //     alert("Product Added Successfully");
    // }
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFiles(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, files.name);
        const uploadTask = uploadBytesResumable(storageRef, files);
        try {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setURL(downloadURL);
                        fetch("http://localhost:3000/admin/addproducts", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: id,
                                name: name,
                                model: model,
                                price: price,
                                quantity: quantity,
                                endDate: dateFormat(endDate),
                                description: description,
                                image: downloadURL,
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                setLoading(false);
                                setName('');
                                setModel('');
                                setPrice('');
                                setQuantity('');
                                setEndDate('');
                                setDescription('');
                                setFiles([]);
                            });
                    });
                }
            );
            alert("Product Added Successfully");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
    }, [id]);

    const [loading, setLoading] = useState(false);
    return (
        <div>
            <ValidatorForm onSubmit={handleUpload} onError={() => null} loading={loading}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField label="Name" onChange={(e) => setName(e.target.value)} name="name" value={name} validators={["required"]} errorMessages={["this field is required"]} />
                        <TextField label="Model" onChange={(e) => setModel(e.target.value)} name="model" value={model} validators={["required"]} errorMessages={["this field is required"]} />
                        <TextField label="Price" onChange={(e) => setPrice(e.target.value)} name="price" value={price} validators={["required"]} errorMessages={["this field is required"]} />
                        <TextField label="Quantity" onChange={(e) => setQuantity(e.target.value)} name="quantity" value={quantity} validators={["required"]} errorMessages={["this field is required"]} />
                        <TextField label="Description" onChange={(e) => setDescription(e.target.value)} name="description" value={description} validators={["required"]} errorMessages={["this field is required"]} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={endDate}
                                onChange={setEndDate}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        label="Date picker"
                                        id="mui-pickers-date"
                                        sx={{ mb: 2, width: "100%" }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <input type="file" onChange={handleChange} />
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
export default AddProduct;
