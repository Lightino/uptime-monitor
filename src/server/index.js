import express from "express";
import chalk from "chalk";
import path from "path";
import dotenv from 'dotenv';

import api from "./api/index.js"
import cors from 'cors';

import { connectToDb, migrateToLatest } from './db/index.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.cjs';

dotenv.config();

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(express.static(path.join(process.cwd(), "dist"))); 

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', api);

if (env !== "development") {
  app.get("*", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "dist", "index.html"));
  });
}

app.use(function (request, response) {
    response.status(404);
    response.json({ message: "Resource not found, wrong path" });
  });
  

  app.use((err, request, response, next) => {
    console.error(err.message);
    console.error(err.stack);
    if (response.headersSent) {
      return next(err);
    }
    response.status(500);
    response.json({
      message: err.message,
    });
  });

console.log(`🕹️\tEnvironment [[ ${chalk.bold.cyan(env)} ]]`);

connectToDb()
  .then(() => {
    // If production env, lets migrate DB to latest version before init server
    if (env === 'production') {
      return migrateToLatest();
    }
  })
  .then(() => {
    // Listen for requests only after DB spin up and migration
    app.listen(port, () => {
      console.log(`👂\tExample app listening on port ${chalk.bold.yellow(port)}`);
    });
  });


process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});
