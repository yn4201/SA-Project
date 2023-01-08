var admin = require("firebase-admin");
var serviceAccount = require("./utils/firebase-key.json");
var cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
//products 
app.post('/admin/addproducts', (req, res) => {
    try {
        console.log(req.body);
        const id = Date.now().toString();
        const modelJson = {
            id: id,
            name: req.body.name,
            model: req.body.model,
            price: req.body.price,
            quantity: req.body.quantity,
            endDate: req.body.endDate,
            description: req.body.description,
            image: req.body.image,
        };
        const addproducts = db.collection('products').doc(id).set(modelJson);
        res.send(addproducts);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});
//get all products
app.get('/admin/getall', async (req, res) => {
    try {
        const productRef = db.collection('products');
        const response = await productRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});

//get details of a products
app.get('/admin/getproducts/:id', async (req, res) => {
    try {
        const userRef = db.collection('products').doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});

//update products
app.put('/admin/updateproducts/:id', async (req, res) => {
    try {
        const userRef = db.collection('products').doc(req.params.id);
        const response = await userRef.update(req.body);
        res.send(response);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});

//delete a products
app.delete('/admin/deleteproducts/:id', async (req, res) => {
    try {
        const userRef = db.collection('products').doc(req.params.id);
        const response = await userRef.delete();
        res.send(response);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});

//admin update order status with id 
app.put('/admin/updatestatus/:id', async (req, res) => {
    try {
        const response = db.collection('order').doc(req.params.id).update({
            status: 'Đã giao hàng'
        });
        res.send(response);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});

//findname product with query
app.get('/admin/findproduct', async (req, res) => {
    try {
        const userRef = db.collection('products');
        const response = await userRef.where('name', '==', req.body.name).get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
            console.log(doc.data());
        }
        );
        res.send(responseArr);
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

//admin get all order
app.get('/admin/getallorder', async (req, res) => {
    try {
        const userRef = db.collection('order');
        const cusRef = db.collection('customer');
        const response = await userRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        const cus_id = responseArr.map(item => item.cus_id);
        console.log(cus_id);
        //update cus_id in order to array with data of customer
        for (let i = 0; i < cus_id.length; i++) {
            const cus = await cusRef.doc(cus_id[i]).get();
            responseArr[i].cus_id = cus.data();
        }
        res.send(responseArr);
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

//admin get all customer
app.get('/admin/getallcustomer', async (req, res) => {
    try {
        const userRef = db.collection('customer');
        const response = await userRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        }
        );
        res.send(responseArr);
    } catch (error) {
        console.log(error);
        req.send(error);
    }
});
//admin get details of a customer
app.get('/admin/getcustomer/:id', async (req, res) => {
    try {
        const userRef = db.collection('customer').doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());

    } catch (error) {
        console.log(error);
        req.send(error);
    }
});
//admin delete a customer
app.delete('/admin/deletecustomer/:id', async (req, res) => {
    try {
        const userRef = db.collection('customer').doc(req.params.id);
        const response = await userRef.delete();
        res.send(response);
    } catch (error) {
        req.send(error);
        console.log(error);
    }
});
//admin getorder details with product id 
app.get('/admin/getorder', async (req, res) => {
    try {
        const userRef = db.collection('order');
        const cusRef = db.collection('customer');
        const response = await userRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        const cus_id = responseArr.map(item => item.cus_id);
        //update cus_id in order to array with data of customer
        for (let i = 0; i < cus_id.length; i++) {
            const cus = await cusRef.doc(cus_id[i]).get();
            responseArr[i].cus_id = cus.data();
        }
        //update product_id in order to array with data of product
        const pro_id = responseArr.map(item => item.pro_id);
        console.log(pro_id);
        //for each pro_id get details in product
        // for (let i = 0; i < pro_id.length; i++) {
        //     const pro = await db.collection('products').doc(pro_id[i]).get();
        //     responseArr[i].pro_id = pro.data();
        // }
        // const strPro_id = pro_id.toString().split(",");
        // console.log(strPro_id);
        // const proRef = db.collection('products');
        // //update product_id in order to array with data of product
        // let array = [];
        // for (let i = 0; i < strPro_id.length; i++) {
        //     const pro = await proRef.doc(strPro_id[i]).get();
        //     array.push({ pro_details: pro.data() });
        // }
        // for (let i = 0; i < pro_id.length; i++) {
        //     responseArr[i].pro_id.push(array[i]);
        // }



        // for (let i = 0; i < responseArr.length; i++) {
        //     responseArr[i].pro_id = proArray;
        // }

        res.send(responseArr);
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});
//get
//admin get customer id
app.get('/admin/getcustomerid/:id', async (req, res) => {
    try {
        const userRef = db.collection('customer').doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});
//admin delete order with doc id
app.delete('/admin/deleteorder/:id', async (req, res) => {
    try {
        const userRef = db.collection('order').doc(req.params.id);
        const response = await userRef.delete();
        res.send(response + 'đã xóa');
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

app.put('/admin/accpetcheckout', async (req, res) => {
    try {
        const orderRef = db.collection('order');
        const response = await orderRef.where('id', '==', req.body.id).get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        const product_id = responseArr.map((item) => item.pro_id);
        const product_quantity = responseArr.map((item) => item.quantity);
        const string = product_id.toString();
        const string_quantity = product_quantity.toString();
        const array = string.split(",");
        const array_quantity = string_quantity.split(",");
        const productRef = db.collection('products');
        let responseArr1 = [];
        let array_value = [];
        let quantity = '';
        for (let i = 0; i < array.length; i++) {
            const response = await productRef.where('id', '==', array[i]).get();
            response.forEach(doc => {
                responseArr1.push(doc.data());
            });
            this.quantity = responseArr1.map((item) => item.quantity);

        }
        let updateQuantity;
        for (let i = 0; i < this.quantity.length; i++) {
            const quantity = this.quantity[i] - array_quantity[i];
            this.updateQuantity = db.collection('products').doc(array[i]).update({
                quantity: quantity
            });
        }
        const updateStatus = db.collection('order').doc(req.body.id).update({
            status: 'Đã giao hàng'
        });
        res.send(responseArr, this.updateQuantity, updateStatus);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});

//admin done ============================================

//client add to cart 
app.post('/client/addtocart', async (req, res) => {
    try {
        const id = Date.now().toString();
        const modelJson = {
            id: id,
            cus_id: req.body.cus_id,
            pro_id: req.body.pro_id,
            quantity: req.body.quantity,
            status:  "cart",
        };
        const addtocart = db.collection('cart').doc(id).set(modelJson);
        res.send(addtocart + "đã thêm vào giỏ hàng");
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});
//find list of cart by cus_id and sum total price
// app.get('/client/getcart', async (req, res) => {
//     try {
//         const userRef = db.collection('cart');
//         //find in cart where cus_id = req.body.cus_id
//         const response = await userRef.where('cus_id', '==', req.body.cus_id).get();
//         let responseArr = [];
//         response.forEach(doc => {
//             responseArr.push(doc.data());
//         });
//         const product_id = responseArr.map((item) => item.pro_id);
//         const product_quantity = responseArr.map((item) => item.quantity);
//         //get detail of product by pro_id
//         let responseArr1 = [];

//         const productRef = db.collection('products');
//         const price = '';
//         for (let i = 0; i < product_id.length; i++) {
//             const response = await productRef.where('id', '==', product_id[i]).get();
//             response.forEach(doc => {
//                 responseArr.push(doc.data());
//                 responseArr1.push(doc.data().price);
//             });
//             this.price = responseArr1[i];
//         }
//         let total = 0;
//         let arraySum = [];
//         for (let i = 0; i < product_id.length; i++) {
//             let sum = responseArr1[i] * product_quantity[i];
//             arraySum.push(sum);
//             total += arraySum[i];
//         }
//         responseArr.push({ total: total });
//         res.send(responseArr);
//     } catch (err) {
//         res.send(err);
//         console.log(err);
//     }
// });
app.get('/client/getcart/:id', async (req, res) => {
     try {
         const userRef = db.collection('cart');
         const response = await userRef.where('cus_id', '==', req.params.id).get();
         let responseArr = [];
         response.forEach(doc => {
             responseArr.push(doc.data());
         });
         
         res.send(responseArr);
     } catch (error) {
        
     }
});

//client update cart
// app.put('/client/updatecart', async (req, res) => {
//     try {
//         const userRef = db.collection('cart').doc(req.body.id);
//         const response = await userRef.update({
//             quantity: req.body.quantity
//         });
//         res.send(response);
//     } catch (error) {
//         res.send(error);
//         console.log(error);
//     }
// });

app.put('/client/updatecart/:id', async (req, res) => {
    try { 
        const userRef = db.collection('cart').doc(req.params.id);
        const response = await userRef.update({
            quantity: req.body.quantity
        });
        res.send(response);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});

//client get cart by id
app.get('/client/getcartbyid/:id', async (req, res) => {
    try {
        const userRef = db.collection('cart').doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});

//client delete cart
app.delete('/client/deletecart/:id', async (req, res) => {
    try {
        const userRef = db.collection('cart').doc(req.params.id);
        const response = await userRef.delete();
        res.send(response);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});

//client checkout order
app.post('/client/checkout/:cus_id', async (req, res) => {
    try {
        const userRef = db.collection('cart');
        //find in cart where cus_id = req.body.cus_id
        const response = await userRef.where('cus_id', '==', req.params.cus_id).get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        const product_id = responseArr.map((item) => item.pro_id);
        const product_quantity = responseArr.map((item) => item.quantity);
        //get detail of product by pro_id
        let responseArr1 = [];

        const productRef = db.collection('products');
        const price = '';
        for (let i = 0; i < product_id.length; i++) {
            const response = await productRef.where('id', '==', product_id[i]).get();
            response.forEach(doc => {
                responseArr.push(doc.data());
                responseArr1.push(doc.data().price);
            });
            this.price = responseArr1[i];
        }
        let total = 0;
        let arraySum = [];
        for (let i = 0; i < product_id.length; i++) {
            let sum = responseArr1[i] * product_quantity[i];
            arraySum.push(sum);
            total += arraySum[i];
        }
        const modelJson = {
            id: Date.now().toString(),
            cus_id: req.params.cus_id,
            pro_id: product_id,
            quantity: product_quantity,
            total: total,
            status: 'order',
        };
        const addorder = db.collection('order').doc(modelJson.id).set(modelJson);
        responseArr.push({ total: total });
        res.send(addorder);
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

//login firebase
app.post('/admin/login', async (req, res) => {
    try {
        const userRef = db.collection('users');
        const response = await userRef.where('email', '==', req.body.email).get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        if (responseArr.length == 0) {
            res.send("Email không tồn tại");
        } else {
            if (responseArr[0].password == req.body.password) {
                res.send(responseArr);
            } else {
                res.send("Sai mật khẩu");
            }
        }
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// //add order
// app.post('/client/order', (req, res) => {
//     try {
//         console.log(req.body);
//         const id = Date.now().toString();
//         const modelJson = {
//             id: id,
//             cus_id: req.body.cus_id,
//             status: req.body.status,
//             products: req.body.products,
//         };
//         //find products in order and show the total price
//         const addOrder = db.collection('order').doc(id).set(modelJson);
//         res.send(addOrder);
//     }
//     catch (err) {
//         res.send(err);
//         console.log(err);
//     }
// });

// app.get('/getall/order', async (req, res) => {
//     try {
//         const orderRef = db.collection('order');
//         const response = await orderRef.get();
//         let responseArr = [];
//         response.forEach(doc => {
//             responseArr.push(doc.data());
//         });
//         res.send(responseArr);
//         //take value quantity from array
//         const quantity = responseArr.map((item) => item.products.map((item) => item.product_id));
//         console.log(quantity);
//     }
//     catch (err) {
//         res.send(err);
//         console.log(err);
//     }
// });

// //delete a order
// app.delete('/deleteorder/:id', async (req, res) => {
//     try {
//         const userRef = db.collection('order').doc(req.params.id);
//         const response = await userRef.delete();
//         console.log("done");
//         res.send(response);
//     }
//     catch (err) {
//         res.send(err);
//         console.log(err);
//     }
// });

// //get detail with query
// app.get('/getorder', async (req, res) => {
//     try {
//         const orderRef = db.collection('order');
//         const response = await orderRef.where('id', '==', req.body.id).get();
//         let responseArr = [];
//         response.forEach(doc => {
//             responseArr.push(doc.data());
//         });
//         const product_id = responseArr.map((item) => item.products.map((item) => item.product_id));
//         const product_quantity = responseArr.map((item) => item.products.map((item) => item.product_quantity));
//         const string = product_id.toString();
//         const array = string.split(",");
//         const productRef = db.collection('products');
//         let arrayDetails = [];
//         const getPrice = '';
//         for (let i = 0; i < array.length; i++) {
//             const response = await productRef.where('id', '==', array[i]).get();
//             response.forEach(doc => {
//                 arrayDetails.push(doc.data());
//             });
//             console.log(arrayDetails);
//             this.getPrice = arrayDetails.map((item) => item.price);
//             console.log(this.getPrice);
//         }

//         let addTotal = '';
//         let arraySum = [];
//         let sum = 0;
//         for (let i = 0; i < this.getPrice.length; i++) {
//             addTotal = this.getPrice[i] * product_quantity[0][i];
//             console.log(addTotal);
//             arraySum.push(addTotal);
//             sum += arraySum[i];
//             console.log(sum);
//         }
//         //add sum to collection order of this order
//         const responseSum = db.collection('order').doc(req.body.id).update({ total: sum });
//         // console.log(getPrice);
//         res.send(responseSum);
//     } catch (err) {
//         res.send(err);
//         console.log(err);
//     }
// });

// //register customer
// app.post('/register', (req, res) => {
//     try {
//         console.log(req.body);
//         const id = Date.now().toString();
//         const modelJson = {
//             id: id,
//             cus_name: req.body.cus_name,
//             cus_email: req.body.cus_email,
//             cus_password: req.body.cus_password,
//             cus_phone: req.body.cus_phone,
//             cus_address: req.body.cus_address,
//         };
//         const addCus = db.collection('customer').doc(id).set(modelJson);
//         res.send(addCus);
//     }
//     catch (err) {
//         res.send(err);
//         console.log(err);
//     }
// });


// //update quantity of product when order
// app.put('/checkout', async (req, res) => {
//     try {
//         const orderRef = db.collection('order');
//         const response = await orderRef.where('id', '==', req.body.id).get();
//         let responseArr = [];
//         response.forEach(doc => {
//             responseArr.push(doc.data());
//         });
//         const product_id = responseArr.map((item) => item.products.map((item) => item.product_id));
//         const product_quantity = responseArr.map((item) => item.products.map((item) => item.product_quantity));
//         const string = product_id.toString();
//         const string_quantity = product_quantity.toString();
//         const array = string.split(",");
//         const array_quantity = string_quantity.split(",");
//         const productRef = db.collection('products');
//         let responseArr1 = [];
//         let array_value = [];
//         let quantity = '';
//         for (let i = 0; i < array.length; i++) {
//             const response = await productRef.where('id', '==', array[i]).get();
//             response.forEach(doc => {
//                 responseArr1.push(doc.data());
//             });
//             this.quantity = responseArr1.map((item) => item.quantity);

//         }
//         let updateQuantity;
//         for (let i = 0; i < this.quantity.length; i++) {
//             const quantity = this.quantity[i] - array_quantity[i];
//             this.updateQuantity = db.collection('products').doc(array[i]).update({
//                 quantity: quantity
//             });
//         }
//         const updateStatus = db.collection('order').doc(req.body.id).update({
//             status: 'Đã giao hàng'
//         });
//         res.send(responseArr, this.updateQuantity, updateStatus);
//     }
//     catch (err) {
//         res.send(err);
//         console.log(err);
//     }
// });



