import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import SerialPortHandler from './serialPort';
import logger from './logger';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const SERIAL_PORT_PATH = process.env.SERIAL_PORT_PATH || 'COM3';
const BAUD_RATE = parseInt(process.env.BAUD_RATE || '9600', 10);

// Initialize Serial Port Handler
const serialPortHandler = new SerialPortHandler(SERIAL_PORT_PATH, BAUD_RATE);

// Serve static files
app.use(express.static('public'));

// WebSocket connection
io.on('connection', (socket) => {
  logger.info('A user connected');

  socket.on('disconnect', () => {
    logger.info('A user disconnected');
  });

  // Emit serial data to clients (you may want to adapt this part)
  socket.on('requestData', () => {
    // Send latest data to client (implement this part based on your application logic)
    // socket.emit('serialData', latestData);
  });
});

// Start the server
server.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
