import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import { InitSocket } from './socket';
import http from 'http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

InitSocket(server)
app.get("/", (req, res) => {
  res.send(" Socket server  running inside Turborepo!");
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
