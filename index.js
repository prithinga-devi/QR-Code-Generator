import express from 'express';
import qr from 'qr-image';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;

// Logging middleware
app.use((req, res, next) => {
   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
   next();
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

app.post('/api/generate', (req, res) => {
   const url = req.body.url;
   if (!url) {
      return res.status(400).send('URL is required');
   }

   try {
      const qr_svg = qr.image(url);
      res.type('png');
      qr_svg.pipe(res);
   } catch (error) {
      console.error('QR Generation Error:', error);
      res.status(500).send('Error generating QR code');
   }
});

// Serve static files last to avoid conflicts
app.use(express.static(__dirname));

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});