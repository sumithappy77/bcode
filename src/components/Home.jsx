import React, { useState, useEffect, useRef } from "react";
import Barcode from "react-barcode";
import { BrowserMultiFormatReader } from "@zxing/library";
import "./Home.css";
import { QRCodeCanvas } from "qrcode.react";


function Home() {
  const [products] = useState([
    { id: "PRD001", name: "Shoes", price: 999 },
    { id: "PRD002", name: "T-Shirt", price: 499 },
    { id: "PRD003", name: "Watch", price: 1999 },
  ]);

  const [scannedResult, setScannedResult] = useState("");
  const [scannedProducts, setScannedProducts] = useState([]);
  const [scannedCodes, setScannedCodes] = useState([]);
  const [qrText, setQrText] = useState("");



  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (videoRef.current) {
      codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
    if (result) {
  const scannedValue = result.text;
  setScannedResult(scannedValue);

  setScannedCodes((prev) => {
    if (!prev.includes(scannedValue)) {
      return [...prev, scannedValue];
    }
    return prev;
  });
}


        }
      );
    }

    return () => {
      codeReader.reset();
    };
  }, [products]);

  return (
    <div className="container">
      <h1>Product Inventory</h1>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>
            <Barcode value={product.id} />
          </div>
        ))}
      </div>

      <div className="scanner">
        <h2>Scan Barcode</h2>
        <video ref={videoRef} className="video" />
        {scannedResult && (
          <p className="result">Scanned: {scannedResult}</p>
        )}
      </div>

      <div className="scanned-list">
  <h2>Scanned Products</h2>
  {scannedProducts.map((item, index) => (
    <div key={index} className="scanned-item">
      {item.name} - ₹ {item.price}
    </div>
  ))}
</div>

<div className="qr-section">
  <h2>QR Code Generator</h2>

  <input
    type="text"
    placeholder="Enter link or text"
    value={qrText}
    onChange={(e) => setQrText(e.target.value)}
    className="qr-input"
  />

  {qrText && (
    <div className="qr-box">
      <QRCodeCanvas value={qrText} size={200} />
    </div>
  )}
</div>


    </div>
  );
}

export default Home;
