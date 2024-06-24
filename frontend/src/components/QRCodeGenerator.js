import React, { useState } from 'react';
import './QRCodeGenerator.css';
import Box from '@mui/material/Box';
import Header from './Header';

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrCodeSrc, setQrCodeSrc] = useState('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=todo');
  const [isActive, setIsActive] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (!value) {
      setIsActive(false);
    }
  };

  const handleGenerateClick = () => {
    setQrCodeSrc(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputValue}`);
  };

  const handleImageLoad = () => {
    setIsActive(true);
  };

  const handleDownloadClick = async () => {
    const response = await fetch(qrCodeSrc);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
          <Header/>
<Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={2}
    >

      <div className={`wrapper ${isActive ? 'active' : ''}`}>
        <header>
          <h1>QR Code Generator</h1>
          <p>Paste a URL or enter text to create QR code</p>
        </header>
        <div className="form">
          <input
            type="text"
            value={inputValue}
            spellCheck="false"
            placeholder="Enter text or URL"
            onChange={handleInputChange}
            onKeyUp={() => {
              if (!inputValue) {
                setIsActive(false);
              }
            }}
          />
          <button onClick={handleGenerateClick}>
            {isActive ? 'Generate QR Code' : 'Generating QR Code...'}
          </button>
        </div>
        <div className="qr-code" id="qr-code">
          <img
            src={qrCodeSrc}
            alt="QR Code"
            onLoad={handleImageLoad}
          />
        </div>
        {isActive && (
          <button onClick={handleDownloadClick} className="download-button">
            Download QR Code
          </button>
        )}
      </div>
    </Box>
    </div>
    
  );
};

export default QRCodeGenerator;
