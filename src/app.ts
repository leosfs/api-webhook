import express from "express";
import { webhook } from "./modules/webhook"
const app = express();

app.use(express.json())
app.use(webhook)

export { app };