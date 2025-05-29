import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import importCSV from '../utils/importCSV';

dotenv.config();

const runImport = async () => {
  await connectDB();
  await importCSV('data.csv'); // Place your CSV file in the project root as data.csv
  process.exit(0);
};

runImport();
