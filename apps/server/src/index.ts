import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import { InitSocket } from './socket';
import http from 'http';
import router from './auth/user';
import { connectDB } from './lib/mongodb';
dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3001",  
    credentials: true,                
}));

app.use(express.json());

const server = http.createServer(app);

app.use('/api/v1',router);

InitSocket(server)
app.get("/", (req, res) => {
  res.send(" Socket server  running inside Turborepo!");
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
