import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

import { useGetSecurePdfQuery } from '../slices/bookApi';
import { useParams } from 'react-router-dom';
import '../index.css';

const SecureBookViewer = () => {
  const { bookId } = useParams();
  const { data, error, isLoading } = useGetSecurePdfQuery(bookId);

  // Initialize the toolbar plugin
  const toolbarPluginInstance = toolbarPlugin();

  // Check if data exists before destructuring
  if (isLoading) return <div className="p-4">Loading book...</div>;
  if (error || !data) return <div className="text-red-500 p-4">Access denied or error loading PDF.</div>;

  const { pdfUrl, rentalExpired, canDownload } = data || {};  // Safe destructuring

  return (
    <div className="p-4 flex flex-col items-center">
      {rentalExpired ? (
        <div className="text-red-500">This rental has expired. You can no longer access the book.</div>
      ) : (
        <div
          className="w-full max-w-4xl h-[80vh] border rounded shadow overflow-hidden pdfViewerWrapper"
          onContextMenu={(e) => e.preventDefault()}
        >
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer 
              fileUrl={pdfUrl} 
              plugins={[toolbarPluginInstance]} 
            />
          </Worker>
        </div>
      )}

      {!canDownload && (
        <div className="no-download-message">
        
        </div>
      )}
    </div>
  );
};

export default SecureBookViewer;
