// components
import React, { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

const BarcodeGenerator = ({ text }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, text, {
        format: "CODE128",
        displayValue: true,
        fontSize: 18,
        height: 100,
      });
    }
  }, [text]);

  return (
    <div>
      <svg ref={barcodeRef} />
    </div>
  );
};

export default BarcodeGenerator;
