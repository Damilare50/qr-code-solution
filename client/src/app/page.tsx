'use client';

import React, { useState, useEffect } from 'react';
import { QrCode, Smartphone, RefreshCw } from 'lucide-react';
import axios from 'axios';

export default function QRCodePage() {
  const [qrData, setQrData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);

  const fetchQRCode = async () => {
    try {
      setLoading(true);
      const response = await axios.get<string>('https://qr-code-solution.onrender.com/api/qr-code/generate');
      setQrData(response.data);
      setTimeLeft(10);
    } catch (error) {
      console.error('Error fetching QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          fetchQRCode();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg'>
              <QrCode className='w-8 h-8 text-white' />
            </div>
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Movie QR Generator
          </h1>
          <p className='text-gray-300'>
            Scan the QR code to discover 10 amazing movies!
          </p>
        </div>

        <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl'>
          <div className='text-center mb-6'>
            {loading ? (
              <div className='flex items-center justify-center h-64'>
                <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500'></div>
              </div>
            ) : (
              <div className='space-y-4'>
                <div className='bg-white p-4 rounded-xl shadow-lg inline-block'>
                  <img
                    src={qrData ?? ''}
                    alt='QR Code'
                    className='w-48 h-48 mx-auto'
                  />
                </div>

                {/* Timer */}
                <div className='flex items-center justify-center space-x-2 text-sm text-gray-300'>
                  <RefreshCw className='w-4 h-4' />
                  <span>Refreshes in {timeLeft}s</span>
                </div>
              </div>
            )}
          </div>

          <div className='border-t border-white/20 pt-6'>
            <div className='flex items-start space-x-3'>
              <div className='bg-blue-500/20 p-2 rounded-lg'>
                <Smartphone className='w-5 h-5 text-blue-400' />
              </div>
              <div className='flex-1'>
                <h3 className='text-white font-semibold mb-1'>How to scan:</h3>
                <ol className='text-gray-300 text-sm space-y-1'>
                  <li>1. Open your phone&apos;s camera app</li>
                  <li>2. Point it at the QR code</li>
                  <li>3. Tap the notification that appears</li>
                  <li>4. Enjoy your personalized movie list!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 grid grid-cols-2 gap-4'>
          <div className='bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-colors'>
            <div className='text-2xl font-bold text-blue-400 mb-1'>10</div>
            <div className='text-sm text-gray-300'>Random Movies</div>
          </div>
          <div className='bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-colors'>
            <div className='text-2xl font-bold text-purple-400 mb-1'>10s</div>
            <div className='text-sm text-gray-300'>Auto Refresh</div>
          </div>
        </div>
      </div>
    </div>
  );
}
