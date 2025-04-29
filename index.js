import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send("<h1>Tralalero Tralala</h1>")
})
import usersAuthRoutes from './routes/users.routes.js';
app.use('/Auth&', usersAuthRoutes)
import citasRoutes from './routes/citas.routes.js';
app.use('/Citas', citasRoutes)
import GmailRouter from './routes/appointmen.js';
app.use('/gmail', GmailRouter);
app.listen(PORT, () =>{
    console.log(`app running in localhost:${PORT}`)
})

export default app;