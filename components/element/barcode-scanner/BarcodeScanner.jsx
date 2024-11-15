'use client'

import React, { Component } from 'react'
import { useRouter } from 'next/navigation' // Import useRouter hook from Next.js
import Scanner from '../scanner/Scanner'

class BarcodeScanner extends Component {
    state = {
        results: [],
    }

    _scan = () => {
        this.setState({ scanning: !this.state.scanning })
    }

    _onDetected = result => {
        const { code } = result.codeResult;  // Get the scanned code
        this.setState({ results: [result] }); // Store the result

        // Redirect to the dynamic route with the scanned code
        const router = useRouter();
        router.push(`/${code}`); // Redirect to the dynamic route
    }

    render() {
        return (
            <div>
                <span>Barcode Scanner</span>
                <Scanner onDetected={this._onDetected} />
                <textarea
                    style={{ fontSize: 32, width: 320, height: 100, marginTop: 30 }}
                    rowsMax={4}
                    defaultValue={'No data scanned'}
                    value={this.state.results[0] ? this.state.results[0].codeResult.code : 'No data scanned'}
                />
            </div>
        )
    }
}

export default BarcodeScanner;
