import React, { useEffect, useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToImages = ({ pdfFile }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = getDocument(pdfFile);
      const pdf = await loadingTask.promise;
      const pages = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        pages.push(canvas.toDataURL());
      }

      setImages(pages);
    };

    loadPdf();
  }, [pdfFile]);

  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Page ${index + 1}`} />
      ))}
    </div>
  );
};

export default PdfToImages;
