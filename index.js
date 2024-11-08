import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './src/Config/DB/connection.js'
import router from './src/Routes/router.js'
import seedProducts from './src/Config/Migrations/productSeeding.js'

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())
app.use(router);

const port = process.env.PORT || 4001;


app.listen(port,() => {
    console.log(`app listening on port`,port);
})

await seedProducts();

app.get('/',(req,res) => {
    res.send(`e-cart app is running`);
})

// UCtLakXU5jsFYtwA