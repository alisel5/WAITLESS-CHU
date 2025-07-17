import React, { useState } from 'react';

const QRScannerPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string>('');

  const handleStartScan = () => {
    setIsScanning(true);
    // TODO: Implement actual QR scanner logic
    // For now, simulate a scan after 2 seconds
    setTimeout(() => {
      setScannedData('QUEUE_ID_12345');
      setIsScanning(false);
    }, 2000);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">QR Code Scanner</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-64 h-64 bg-gray-100 mx-auto rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-gray-600">Scanning...</p>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01M20 12h.01m-.01 4h.01m.01-.01h.01m.01.01h.01M4 12h2m6 0h2m-6 4h2m0 0h2m-6-4h2m0 0h2"></path>
                  </svg>
                  <p className="text-gray-600">Camera preview will appear here</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {!isScanning ? (
              <button
                onClick={handleStartScan}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Scanning
              </button>
            ) : (
              <button
                onClick={handleStopScan}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Stop Scanning
              </button>
            )}
          </div>
        </div>
      </div>

      {scannedData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2">QR Code Detected!</h2>
          <p className="text-green-700 mb-4">
            Scanned Data: <code className="bg-white px-2 py-1 rounded">{scannedData}</code>
          </p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Join Queue
          </button>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">How to Use</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• Point your camera at the QR code</li>
          <li>• Make sure the code is well-lit and in focus</li>
          <li>• The scanner will automatically detect the code</li>
          <li>• You'll be redirected to join the queue</li>
        </ul>
      </div>
    </div>
  );
};

export default QRScannerPage; 