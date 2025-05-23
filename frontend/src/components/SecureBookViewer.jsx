import React, { useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import type { ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

import { useGetSecurePdfQuery } from '../slices/bookApi';
import { useParams } from 'react-router-dom';

const SecureBookViewer = () => {
  const { bookId } = useParams();
  const { data, error, isLoading } = useGetSecurePdfQuery(bookId);

  // Define the transform function to remove specific slots from toolbar and menu
  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
    ShowProperties: () => <></>,
    ShowPropertiesMenuItem: () => <></>,
     Open: () => <></>,
  });

  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const { pdfUrl, rentalExpired, canDownload } = data || {};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) || // Ctrl+Shift+I/J (dev tools)
        (e.ctrlKey && e.key === 'U') || // Ctrl+U (view source)
        e.key === 'F12' // F12 (dev tools)
      ) {
        e.preventDefault();
      }
    };

    const handleCopyCut = (e) => {
      e.preventDefault();
      alert('Copying is disabled on this page.');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
    };
  }, []);

  if (isLoading) return <div className="p-4">Loading book...</div>;
  if (error || !data)
    return <div className="text-red-500 p-4">Access denied or error loading PDF.</div>;

  return (
    <div className="p-4 flex flex-col items-center">
      {rentalExpired ? (
        <div className="text-red-500 text-center">
          This rental has expired. You can no longer access the book.
        </div>
      ) : (
        <div className="w-full max-w-screen-lg h-[90vh] border rounded shadow select-none relative overflow-hidden flex flex-col">
          <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfUrl}
              plugins={[toolbarPluginInstance]}
              theme="light" // optional, default is light
            />
          </Worker>
        </div>
      )}

      {!canDownload && (
        <div className="mt-4 text-sm text-gray-600 italic">
          Downloading is disabled for rented books.
        </div>
      )}
    </div>
  );
};

export default SecureBookViewer;
