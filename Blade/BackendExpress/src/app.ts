import "dotenv/config";
import express from "express";
import cors from "cors";
import todoRouter from './routes/todo.route';

const app = express();
const port = Number(process.env.PORT || 8080);

app.use(cors());
app.use(express.json());

app.use('/todos', todoRouter);


app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Hello World", ts: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`REST API running: http://localhost:${port}/api/health`);
});
