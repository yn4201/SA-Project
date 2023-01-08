app.put('/checkout', async (req, res) => {
    try {
        const orderRef = db.collection('order');
        const response = await orderRef.where('id', '==', req.body.id).get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        const product_id = responseArr.map((item) => item.products.map((item) => item.product_id));
        // console.log(product_id);
        const product_quantity = responseArr.map((item) => item.products.map((item) => item.product_quantity));
        // console.log(product_id.toString());
        const string = product_id.toString();
        const string_quantity = product_quantity.toString();
        const array = string.split(",");
        const array_quantity = string_quantity.split(",");
        // console.log(array.length);
        // console.log(string_quantity);
        //find each product_id in products and show detail of product
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

            // const stringproductquantity = quantity.toString();
            // const arrayproductquantity = stringproductquantity.split(",");
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
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});