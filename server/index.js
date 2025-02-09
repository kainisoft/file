import cors from 'cors';
import express from 'express';
import fileController from "./controllers/file.controller.js";
import { rateLimit } from 'express-rate-limit'

const app = express();
const port = 4000;

// Remove this rate limit if API Gateway is enabled (traefik)
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 1000,
    standardHeaders: false,
    legacyHeaders: false,
});

app.use(cors());
app.use(limiter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

fileController(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
