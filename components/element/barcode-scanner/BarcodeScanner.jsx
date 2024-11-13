'use client'

import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

const BarcodeScanner = ({ onProductScanned }) => {
  const [scannedProduct, setScannedProduct] = useState(null);

  const handleScan = (data) => {
    setScannedProduct(data);
    onProductScanned(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <BarcodeReader onScan={handleScan} onError={handleError} />
      {scannedProduct && (
        <div>
          <p>Scanned Product Number: {scannedProduct}</p>
          <button onClick={() => onProductScanned('entry')}>Product Entry</button>
          <button onClick={() => onProductScanned('departure')}>Product Departure</button>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
