import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";

import todoRoutes from "./routes/todos";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

// iziuOrCmnGavldZ0
mongoose
  .connect(
    "mongodb+srv://admin:iziuOrCmnGavldZ0@htetlinmaungcluster-vtpxr.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err: Error) => console.log(err.message));
