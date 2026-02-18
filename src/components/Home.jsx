import React, { useState, useEffect, useRef } from "react";
import Barcode from "react-barcode";
import { BrowserMultiFormatReader } from "@zxing/library";
import "./Home.css";

function Home() {
  const [products] = useState([
    { id: "PRD001", name: "Shoes", price: 999 },
    { id: "PRD002", name: "T-Shirt", price: 499 },
    { id: "PRD003", name: "Watch", price: 1999 },
  ]);

  const [scannedResult, setScannedResult] = useState("");
  const [scannedProducts, setScannedProducts] = useState([]);

  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (videoRef.current) {
      codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
         if (result) {
  const scannedId = result.text;
  setScannedResult(scannedId);

  const foundProduct = products.find(
    (product) => product.id === scannedId
  );

  if (foundProduct) {
    setScannedProducts((prev) => [...prev, foundProduct]);
  }
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

    </div>
  );
}

export default Home;
