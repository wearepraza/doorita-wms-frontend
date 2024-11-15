// styles
import styles from '@/public/styles/scanner.module.scss'

// components
import BarcodeScanner from "@/components/element/barcode-scanner/BarcodeScanner"

export default function Scanner () {
    return (
        <div>
            <div className={styles.barcodeScannerContainer}>
                <BarcodeScanner />
            </div>
        </div>
    )
}