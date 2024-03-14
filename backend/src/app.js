import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ApiError from './api-error';
import appRouter from './routers/appRouter'
require('dotenv').config();
let app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use("/", appRouter);
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});
module.exports = app;