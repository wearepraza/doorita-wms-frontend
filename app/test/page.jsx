// imports
import BarcodeGenerator from "@/components/element/barcode-generator/BarcodeGenerator"
import BarcodeScanner from "@/components/element/barcode-scanner/BarcodeScanner"

export default function test() {
    return (
        <div>
            <BarcodeGenerator productNumber={555555555} />
            <BarcodeScanner onProductScanned={(action) => console.log(`Product action: ${action}`)} />
        </div>
    )
}