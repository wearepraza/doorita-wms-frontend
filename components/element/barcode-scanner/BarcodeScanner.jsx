// components
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const BarcodeScannerComponent = dynamic(() => import("react-qr-barcode-scanner"), { ssr: false });

const BarcodeScanner = ({ onScan }) => {
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      onScan(data);  
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <BarcodeScannerComponent
        onUpdate={(err, result) => {
          if (result) handleScan(result.text);
          else if (err) handleError(err);
        }}
      />
    </div>
  );
};

export default BarcodeScanner;
