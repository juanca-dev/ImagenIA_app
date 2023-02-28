import express from 'express';
import * as dotenv from "dotenv";
import cors from "cors";

import imageAi from "./routes/imageAi.js";
import postRoutes from "./routes/postRoutes.js";
import connectDB from './mongodb/connect.js';


//creamos el servidor
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//creamos un app de tippo get

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Dios te Bendiga!!'
  })

})

app.use('/api/v1/imageai', imageAi);
app.use('/api/v1/posts', postRoutes);


const startServer = () => {
  try {

    connectDB(process.env.MONGODB_URL)
    app.listen(8080, () => console.log('Server is running on port http://localhost:8080'))
  } catch (error) {
    console.log(error);
  }
}

startServer();