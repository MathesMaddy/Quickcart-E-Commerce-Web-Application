const express = require('express');
const app = express();
const mongodb = require('mongodb');
const cors = require('cors');
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }))

const uri = 'mongodb://localhost:27017';
const client = new mongodb.MongoClient(uri);

app.get('/categories', async(req, res) => {
    try {
        await client.connect();
        let dbName = 'ECommerce'
        const db = client.db(dbName);
        let collectionName = 'categories';
        const collection = db.collection(collectionName)
        const result = await collection.find({}, { 
            projection : { 
                _id : 0,
            }} ).toArray();
        if(result.length) {
            await client.close();
            return res.status(200).json(result);
        }
        else {
            await client.close()
            return res.status(400).json('Error No Data.');
        }        
    }
    catch(e) {
        await client.close();
        return res.status(400).json('Error');
    }
} )

app.get('/get-limit-products', async(req, res) => {
    try {
        const { page, pageSize } = req.query;
        const startIndex = Number(page - 1) * Number(pageSize)
        await client.connect();
        let dbName = 'ECommerce'
        const db = client.db(dbName);
        let collection = 'products' 
        const product = await db.collection(collection)        
        const docCount = await product.countDocuments()
        const totalPage = Math.ceil( docCount / pageSize );

        const result = await product.find({}, {
            projection : {
                _id : 0
            }        
        }).limit(Number(pageSize)).skip(startIndex).toArray();

        if(result.length) {
            await client.close();
            return res.status(200).json({ 
                products : result, 
                totalPage
            });
        }
        else {
            await client.close()
            return res.status(400).json('Error No Data.');
        }        
    }
    catch(e) {
        await client.close();
        res.status(400).json('Error');
    }
})
app.post('/create-product', async(req, res) => {
    try {
        const { name, category, brand, price, description, picture, warranty } = req.body;
        const productId = `productId${Date.now()}`
        if( name && category && brand && Number(price) && description && picture && warranty) {
            await client.connect();
            let dbName = 'ECommerce'
            const db = client.db(dbName);
            let collection = 'products' 
            const product = await db.collection(collection)
            const result = await product.insertOne({
                name : name,
                category : category,
                brand : brand, 
                price : Number(price), 
                description : description, 
                picture : picture,
                warranty : warranty,
                productId : productId
            });
            if(result.acknowledged) {
                await client.close();
                return res.status(200).json('Successfully created.');
            }
            else {
                await client.close()
                return res.status(400).json('Error No Data.');
            }    
        }
        else {
            await client.close()
            return res.status(400).json('Error No Data.')
        }
    }
    catch(e) {
        await client.close();
        return res.status(400).json('Error');
    }
})
app.post('/delete-product', async(req, res) => {
    try {
        const { id } = req.params;
        if(id) {
            await client.connect();
            let dbName = 'ECommerce'
            const db = client.db(dbName);
            let collection = 'products' 
            const product = await db.collection(collection)
            const result = await product.deleteOne({ productId : id });
            
            if(result.acknowledged) {
                await client.close();
                return res.status(200).json('Successfully deleted.');
            }
            else {
                await client.close()
                return res.status(400).json('Error No Data.');
            }    
        }
        else {
            await client.close()
            return res.status(400).json('Error No Data.')
        }
    }
    catch(e) {
        await client.close();
        return res.status(400).json('Error');
    }
})

app.post('/update-product', async(req, res) => {
    try {
        const { name, category, brand, price, description, picture, warranty, productId } = req.body;
        if( name && category && brand && Number(price) && description && picture && warranty && productId ) {
            await client.connect();
            let dbName = 'ECommerce'
            const db = client.db(dbName);
            let collection = 'products' 
            const product = await db.collection(collection)
            const result = await product.updateOne({ productId : productId }, { $set : {
                name : name,
                category : category,
                brand : brand, 
                price : Number(price), 
                description : description, 
                picture : picture,
                warranty : warranty,
            }});
            if(result.acknowledged) {
                await client.close();
                return res.status(200).json('Successfully created.');
            }
            else {
                await client.close()
                return res.status(400).json('Error No Data.');
            }    
        }
        else {
            await client.close()
            return res.status(400).json('Error No Data.')
        }
    }
    catch(e) {
        await client.close();
        return res.status(400).json('Error');
    }
})
app.get('/category/:id', async(req, res) => {
    try {
        const { id } = req.params
        await client.connect();
        let dbName = 'ECommerce'
        const db = client.db(dbName);
        let collectionName = id;
        const collection = db.collection(collectionName)
        const result = await collection.find({  }, { 
            projection : { 
                _id : 0,
            }} ).toArray();
        if(result.length) {
            await client.close();
            return res.status(200).json(result);
        }
        else {
            await client.close()
            return res.status(400).json('Error No Data.');
        }        
    }
    catch(e) {
        await client.close()
        return res.status(400).json('Error')
    }
})

app.get('/get-all-products', async (req, res) => {
    try {
        await client.connect();
        let dbName = 'ECommerce'
        const db = client.db(dbName);
        let collectionName = 'products';
        const collection = db.collection(collectionName)
        const result = await collection.find({}, { 
            projection : { 
                _id : 0,
                name: 1, 
                category: 1, 
                brand: 1, 
                price: 1, 
                description: 1, 
                picture: 1, 
                productId: 1, 
                warranty: 1 
            }} ).toArray();
        if(result) {
            await client.close();
            return res.status(200).json(result);
        }
        else {
            await client.close()
            return res.status(400).json('Error No Data.');
        }
    }
    catch(e) {
        await client.close();
        return res.status(400).json('Error');
    }
})

app.post('/cart', async(req, res) => {
    try {
        let id = req.body
        await client.connect();
        let dbName = 'ECommerce'
        const db = client.db(dbName);
        let collectionName = 'products';
        const collection = db.collection(collectionName)
        const result = await collection.find({productId  : { $in : id }} , {
            projection : {
                _id : 0,
                name: 1, 
                category: 1, 
                brand: 1, 
                price: 1, 
                description: 1, 
                picture: 1, 
                productId: 1, 
                warranty: 1 
            }
        }).toArray();
        if(result) {
            await client.close();
            return res.status(200).json(result);
        }
        else {
            await client.close()
            return res.status(400).json('Error No Data.');
        }
    }
    catch(e) {
        await client.close()
        return res.status(400).json('Error');
    }
})

app.post('/login', async(req, res) => {
    try {
        const { email,password } = req.body
        if(email && password) {
            if(email !== 'null' && password !== 'null') {
                await client.connect();
                let dbName = 'ECommerce'
                const db = client.db(dbName);
                let collectionName = 'login';
                const collection = db.collection(collectionName)
                const result = await collection.findOne({email  : email, password : password});
                if(result) {
                    await client.close();
                    return res.status(202).json(result);
                }
                else {
                    await client.close();
                    return res.status(401).json('Error No Data.');
                }
            }
            else {
                await client.close();
                return res.status(400).json('Invalid input.')
            }
        }
        else {
            await client.close();
            return res.status(400).json('Input is not given.')
        }
    }
    catch(e) {
        await client.close();
        return res.status(400).json('Error')
    }
})

app.post('/signup', async(req, res) => {
    try {
        const { fullname, email, password } = req.body
        if(fullname && email && password) {
            if(fullname !== 'null' && email !== 'null' && password !== 'null') {
                await client.connect();
                let dbName = 'ECommerce'
                const db = client.db(dbName);
                let collectionName = 'login';        
                const collection = db.collection(collectionName);     
                const result = await collection.find({ fullname  : fullname, email : email }).toArray();
                
                if(result.length === 0) {
                    const create = await collection.insertOne({ fullname  : fullname, email : email, password : password });
                    if(create.acknowledged) {
                        await client.close();
                        return res.status(200).json("Successfully created")
                    }
                    else {
                        await client.close()
                        return res.status(400).json('User has not be created.');
                    }
                }
                else {
                    await client.close()
                    return res.status(400).json('User already exists.');
                }
            }
        }
        else {
            await client.close()
            return res.status(400).json('Input is not given');
        }
    }
    catch(e) {
        await client.close()
        return res.status(400).json('Error')
    }
})

app.get('/product/:id', async(req, res) => {
    try {
        let { id } = req.params
        await client.connect();
        let dbName = 'ECommerce'
        const db = client.db(dbName);
        let collectionName = 'products';
        const collection = db.collection(collectionName)
        const result = await collection.find({ productId : id }, { 
            projection : { 
                _id : 0,
                name: 1,  
                brand: 1, 
                price: 1, 
                description: 1, 
                picture: 1, 
                productId: 1, 
                warranty: 1 
            }} ).toArray();
        if(result) {
            await client.close();
            return res.status(200).json(result);
        }
        else {
            await client.close()
            return res.status(400).json('Error No Data.');
        }
    }
    catch(e) {
        await client.close();
        return res.status(400).json('Error');
    }
})

app.listen(PORT, console.log(`Server is listening Port : ${PORT}`));