'use client'

import React, { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = ({ productNumber }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (productNumber) {
      JsBarcode(barcodeRef.current, productNumber, {
        format: 'CODE128',
        displayValue: true,
      });
    }
  }, [productNumber]);

  return <svg ref={barcodeRef} />;
};

export default BarcodeGenerator;