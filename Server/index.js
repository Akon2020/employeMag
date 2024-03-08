import express from "express";
import cors from "cors";
import { adminRouter } from "./routes/AdminRoute.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", adminRouter);
app.use("/images", express.static("public/images"));
app.listen(3000, () => {
  console.log("Serveur lancé au port 3000");
});
