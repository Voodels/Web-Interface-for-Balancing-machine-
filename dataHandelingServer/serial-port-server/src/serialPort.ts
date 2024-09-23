import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';
import logger from './logger';

// Define the interfaces for TestParameters and TestResults
interface TestParameters {
  srNo: number;
  rotorNo: string;
  a: number;
  b: number;
  c: number;
  leftRadius: number;
  rightRadius: number;
  leftTolerance: number;
  rightTolerance: number;
  unit: string;
  rpm: number;
  correctionMode: string;
}

interface TestResults {
  srNo: number;
  leftMass: number;
  leftAngle: number;
  rightMass: number;
  rightAngle: number;
  leftResult: string;
  rightResult: string;
}

// Define the class for handling serial port communication
class SerialPortHandler {
  private port: SerialPort;
  private parser: Readline;
  
  constructor(path: string, baudRate: number) {
    this.port = new SerialPort({ path, baudRate, autoOpen: false });
    this.parser = this.port.pipe(new Readline({ delimiter: '\r\n' }));

    this.initialize();
  }

  private initialize() {
    this.port.open((err) => {
      if (err) {
        logger.error(`Failed to open serial port: ${err.message}`);
        return;
      }
      logger.info('Serial port opened successfully');
    });

    // Listen for data from the serial port
    this.parser.on('data', (data: string) => this.handleData(data));
    this.parser.on('error', (err: Error) => logger.error(`Parser error: ${err.message}`));
    this.port.on('error', (err: Error) => logger.error(`Serial port error: ${err.message}`));
  }

  private handleData(data: string) {
    try {
      // Parse incoming data
      const parsedData: TestParameters | TestResults = JSON.parse(data);
      logger.info('Received data:', { data: parsedData });
    } catch (err) {
      logger.error(`Failed to parse data: ${(err as Error).message}`);
    }
  }
}

export default SerialPortHandler;
