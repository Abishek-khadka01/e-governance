import express from 'express';
import { config } from 'dotenv';
import { PrismaClient } from './generated/prisma/client';
import AppLogger from './utils/logger';
import cookieParser from 'cookie-parser';
import { IndexRouter } from './routes/index.routes';
import cors from "cors"
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ['POST', 'GET', 'PUT', 'PATCH'],
  credentials: true
}));

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    AppLogger.info(`Prisma is connected successfully`);
  })
  .catch((error) => {
    (AppLogger.error(`Error in connecting to the database `), process.exit(1));
  });

app.use('/', IndexRouter);

export { app, prisma };
