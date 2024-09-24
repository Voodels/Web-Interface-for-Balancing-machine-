import express from 'express';
import fs from 'fs-extra';
import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'fast-csv';

const app = express();
app.use(express.json());

const csvFilePath = './data.csv'; // Path to the CSV file

// Function to read CSV file
app.get('/read-csv', async (req, res) => {
  const results: any[] = [];

  try {
    // Reading and parsing CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results); // Send back CSV data as JSON
      });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read CSV file' });
  }
});

// Function to write to CSV file
app.post('/write-csv', async (req, res) => {
  const dataToWrite = req.body.data; // Data received from request body

  if (!dataToWrite || !Array.isArray(dataToWrite)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: Object.keys(dataToWrite[0]).map((key) => ({ id: key, title: key })),
    append: true, // Append to existing CSV
  });

  try {
    await csvWriter.writeRecords(dataToWrite);
    res.json({ message: 'CSV updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write to CSV file' });
  }
});

// Start server
app.listen(3001, () => {
  console.log('CSV handler API running on port 3001');
});
