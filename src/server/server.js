const express = require('express');
const pdf2img = require('pdf2img');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.json());

app.post('/convert-pdf', async (req, res) => {
  const { pdfUrl } = req.body;
  
  try {
    // Fetch the PDF file
    const response = await axios({
      url: pdfUrl,
      responseType: 'arraybuffer'
    });
    
    // Save the PDF file temporarily
    const tempPdfPath = path.join(__dirname, 'temp.pdf');
    fs.writeFileSync(tempPdfPath, response.data);
    
    // Convert PDF to images
    pdf2img.convert(tempPdfPath, (err, images) => {
      if (err) {
        return res.status(500).send('Error converting PDF');
      }

      // Clean up temporary PDF file
      fs.unlinkSync(tempPdfPath);

      // Send images as response
      res.json(images.map((image, index) => ({
        filename: `output${index}.png`,
        data: image.toString('base64')
      })));
    });
  } catch (error) {
    res.status(500).send('Error fetching or processing PDF');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
