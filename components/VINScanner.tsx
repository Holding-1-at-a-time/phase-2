
import React, { useState, useEffect, useCallback } from 'react';
import CameraIcon from './icons/CameraIcon';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  onScanSuccess: (vin: string, details: { year: string, make: string, model: string }) => void;
}

// Mock VINs and their decoded data
const MOCK_VINS = [
  { vin: '1G1FY1EJOJR123456', year: '2018', make: 'Chevrolet', model: 'Camaro' },
  { vin: 'JTJHY7AX4K5012345', year: '2019', make: 'Toyota', model: 'RAV4' },
  { vin: '5YJSA1E2XLF123456', year: '2020', make: 'Tesla', model: 'Model 3' },
  { vin: '1FTFW1E5XKF123456', year: '2021', make: 'Ford', model: 'F-150' },
];

const VINScanner: React.FC<Props> = ({ onScanSuccess }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestCameraPermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
    } catch (err) {
      console.error("Camera permission denied:", err);
      setHasPermission(false);
      setMessage('Camera permission is required to use the scanner.');
    }
  }, []);

  useEffect(() => {
    requestCameraPermission();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScan = () => {
    if (!hasPermission) {
        requestCameraPermission();
        return;
    }

    setIsScanning(true);
    setMessage('Position the VIN in the frame...');
    
    setTimeout(() => {
      // Simulate a successful scan
      const randomVIN = MOCK_VINS[Math.floor(Math.random() * MOCK_VINS.length)];
      onScanSuccess(randomVIN.vin, { year: randomVIN.year, make: randomVIN.make, model: randomVIN.model });
      setMessage(`Scan complete! Found a ${randomVIN.year} ${randomVIN.make} ${randomVIN.model}.`);
      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg border-dashed border-2 border-gray-300 text-center">
      <div className="mb-2 h-20 flex items-center justify-center bg-gray-700 rounded-md relative overflow-hidden">
        {isScanning ? (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center">
                 <div className="w-10 h-10 mb-2"><LoadingSpinner /></div>
                 <p className="text-white text-sm animate-pulse">{message}</p>
                 <div className="absolute top-0 left-1/2 w-full h-0.5 bg-red-500 shadow-lg animate-[scan-line_2s_ease-in-out_infinite]"></div>
                 <style>{`
                    @keyframes scan-line {
                        0% { transform: translate(-50%, 0); }
                        100% { transform: translate(-50%, 1900%); }
                    }
                 `}</style>
            </div>
        ) : (
            <p className="text-gray-400 text-sm">{message || 'Scan your vehicle\'s VIN barcode for easy entry.'}</p>
        )}
      </div>
      <button
        onClick={handleScan}
        disabled={isScanning || hasPermission === false}
        className="w-full sm:w-auto px-6 py-2 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center mx-auto"
      >
        <CameraIcon className="w-5 h-5 mr-2" />
        {isScanning ? 'Scanning...' : 'Scan VIN'}
      </button>
      {hasPermission === false && <p className="text-xs text-red-500 mt-2">Please enable camera permissions in your browser settings to use this feature.</p>}
    </div>
  );
};

export default VINScanner;
