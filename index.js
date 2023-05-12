const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

const port = process.env.PORT || 4000;


// JLZ1kO2j907aR99G cardoctor
app.use(cors())

app.use(express.json())



const uri = "mongodb+srv://cardoctor:JLZ1kO2j907aR99G@cluster0.tbmejyb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const carCollection = client.db('carService').collection('services');
    const bookingCollection = client.db('carService').collection('bookings');

    app.get('/services', async(req, res) =>{
        const cursor = carCollection.find();
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/bookings', async(req, res) =>{
        const gettingBook = bookingCollection.find();
        const result = await gettingBook.toArray()
        res.send(result)
    })


    app.post('/bookings', async(req,res) =>{
        const cursor = req.body;
        const result = await bookingCollection.insertOne(cursor);
        res.send(result);
    })


    app.delete('/bookings/:id', async(req, res) =>{
        const id = req.params.id;
        const book = { _id: new ObjectId(id)};
        const result = await bookingCollection.deleteOne(book);
        res.send(result);
    })










    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('welcome my friend')
})

app.listen(port, ()=>{
    console.log(`The port is running on:${port}`)
})