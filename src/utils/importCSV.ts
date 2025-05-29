import mongoose from 'mongoose';
import csv from 'csv-parser';
import fs from 'fs';
import Property from '../models/Property';

const importCSV = async (csvPath: string) => {
  const properties: any[] = [];
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        // Map CSV fields to Property model
        properties.push({
          title: row.title,
          description: row.tags || row.title, // Use tags or title as description fallback
          price: Number(row.price),
          location: `${row.city}, ${row.state}`,
          bedrooms: Number(row.bedrooms),
          bathrooms: Number(row.bathrooms),
          area: Number(row.areaSqFt),
          propertyType: row.type,
          images: [], // No images in CSV
          createdBy: new mongoose.Types.ObjectId('000000000000000000000000'), // Dummy user
        });
      })
      .on('end', async () => {
        try {
          await Property.insertMany(properties);
          console.log('CSV data imported successfully');
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
};

export default importCSV;
