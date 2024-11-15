'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Scanner from '../scanner/Scanner'

const BarcodeScanner = () => {
    const router = useRouter();
    
    const handleDetected = (result) => {
        const code = result.codeResult.code; 
        router.push(`/dashboard/${code}`); 
    };

    return (
        <div>
            <Scanner onDetected={handleDetected} />
        </div>
    );
};

export default BarcodeScanner;
