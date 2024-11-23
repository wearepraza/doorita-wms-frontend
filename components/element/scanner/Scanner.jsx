'use client';

import React, { Component } from 'react';
import Quagga from '@ericblade/quagga2';

class Scanner extends Component {
    componentDidMount() {
        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    constraints: {
                        width: { ideal: 400 },
                        height: { ideal: 320 },
                        facingMode: 'environment',
                    },
                },
                locator: {
                    halfSample: true,
                    patchSize: 'large',
                },
                numOfWorkers: 4,
                decoder: {
                    readers: ['code_128_reader'],
                },
                locate: true,
            },
            (err) => {
                if (err) {
                    console.error('Quagga init failed:', err);
                    return;
                }
                Quagga.start();
            }
        );
        Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
        Quagga.stop(); // Stop the stream
    }

    _onDetected = (result) => {
        if (this.props.onDetected) {
            this.props.onDetected(result);
        }
    };

    render() {
        return <div id="interactive" className="viewport" />;
    }
}

export default Scanner;
