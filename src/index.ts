import { listen } from "@colyseus/tools";

// Import Colyseus config
import app from "./app.config";
const PORT = Number(process.env.PORT);

listen(app,PORT);
console.log("Listen on: ",PORT);