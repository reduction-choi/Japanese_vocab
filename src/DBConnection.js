function DBConnection(){
    // const uri = "mongodb+srv://hanwon0713:5RSaziBn69sxqyje@japanese-vocab.wuczewm.mongodb.net/?retryWrites=true&w=majority&appName=Japanese-vocab";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    // const client = new MongoClient(uri, {
    //     serverApi: {
    //         version: ServerApiVersion.v1,
    //         strict: true,
    //         deprecationErrors: true,
    //     }
    // });
    async function connect() {
        try {
            console.log("working");
            fetch("https://crispy-space-acorn-5666vwggqg4hvjj9-3001.app.github.dev/api/hello")
                .then(res => res.json())
                .then(data => console.log(data));

            fetch("https://crispy-space-acorn-5666vwggqg4hvjj9-3001.app.github.dev/api/connect")
                .then(res => res.json())
                .then(data => console.log(data));

            // const mongoose = require('mongoose');
            // mongoose.connect('mongodb+srv://hanwon0713:5RSaziBn69sxqyje@japanese-vocab.wuczewm.mongodb.net/?retryWrites=true&w=majority&appName=Japanese-vocab',{
            //     useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
            // }).then(() => console.log('MogoDB가 연결되었다...!'))
            //     .catch(() => console.log('failed'))
            // // Connect the client to the server	(optional starting in v4.7)
            // await client.connect();
            // // Send a ping to confirm a successful connection
            // await client.db("admin").command({ ping: 1 });
            // console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <div>
            <button onClick={connect}>DB 연결</button>
        </div>
    )
}
export default DBConnection;