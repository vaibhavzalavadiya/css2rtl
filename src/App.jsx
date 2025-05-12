import { useState, useEffect } from 'react';
import { filterCSS, clearInput, copyCSS, downloadCSS } from './assets/js/custom';
import Notification from './assets/components/Notification';

export default function App() {
  const [inputCSS, setInputCSS] = useState('');
  const [outputCSS, setOutputCSS] = useState('');
  const [inputLineCount, setInputLineCount] = useState(0);
  const [outputLineCount, setOutputLineCount] = useState(0);
  const [notification, setNotification] = useState(null);
  const [showFullCSS, setShowFullCSS] = useState(true); 

  useEffect(() => {
    setInputLineCount(inputCSS ? inputCSS.split('\n').length : 0);
    setOutputLineCount(outputCSS ? outputCSS.split('\n').length : 0);
  }, [inputCSS, outputCSS]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFilterCSS = () => {
    const result = filterCSS(inputCSS, showFullCSS);
    setOutputCSS(result);
  };

  const handleClearInput = () => {
    clearInput();
    setInputCSS('');
    setOutputCSS('');
  };

  const handleCopyCSS = () => {
    if (!outputCSS) {
      showNotification('No CSS content to copy', 'error');
      return;
    }
    copyCSS(outputCSS)
      .then(() => showNotification('CSS copied to clipboard!', 'success'))
      .catch(() => showNotification('Copy failed. Please try again.', 'error'));
  };

  const handleDownloadCSS = () => {
    if (!outputCSS) {
      showNotification('No CSS content to download', 'error');
      return;
    }
    downloadCSS(outputCSS);
    showNotification('CSS file downloaded', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-gray-200">
      {/* Main */}
      <main className="py-4 md:py-8 container mx-auto">
          <div className="bg-slate-800 shadow-xl rounded-lg overflow-hidden border border-slate-700">
            {/* Header with info and documentation */}
            <div className="p-4 md:p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="max-w-3xl">
                <h1 className="text-xl font-semibold text-white mb-2">RTL CSS Converter</h1>
                <p className="text-gray-400">
                  Convert your CSS for right-to-left layouts. This tool specifically targets direction-related properties.
                </p>
              </div>
              <a
                href="/documentation"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Documentation
              </a>
            </div>

            {/* Options and Actions - Moved to top for better visibility */}
            <div className="px-4 md:px-6 py-4 bg-slate-900 border-b border-slate-700 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3">
              {/* Checkbox with improved styling */}
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      id="showFullCSS"
                      type="checkbox"
                      className="sr-only"
                      checked={showFullCSS}
                      onChange={(e) => setShowFullCSS(e.target.checked)}
                    />
                    <div className={`w-10 h-5 rounded-full shadow-inner transition-colors ${showFullCSS ? 'bg-indigo-600' : 'bg-gray-700'}`}></div>
                    <div className={`absolute w-4 h-4 rounded-full shadow top-0.5 transition-all ${showFullCSS ? 'transform translate-x-5 bg-white' : 'bg-gray-300 left-0.5'}`}></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-300">Include non-RTL properties</span>
                </label>
              </div>

              {/* Main action buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleFilterCSS}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-md transition flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Convert to RTL
                </button>
              </div>
            </div>

            {/* Input/Output Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Original CSS */}
              <div className="p-4 md:border-r border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300" htmlFor="inputCSS">
                    Original CSS:
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {inputLineCount} line{inputLineCount !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={handleClearInput}
                      className="text-gray-400 hover:text-gray-200 bg-slate-800 hover:bg-slate-700 p-1 rounded"
                      title="Clear Input"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative h-64 md:h-80 mb-2 border border-slate-600 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
                  <div className="absolute inset-y-0 left-0 w-8 bg-slate-700 flex flex-col text-xs text-gray-500 pt-3 select-none text-right">
                    {inputCSS.split('\n').map((_, i) => (
                      <div key={i} className="pr-2 h-6 leading-6">{i + 1}</div>
                    ))}
                  </div>
                  <textarea
                    id="inputCSS"
                    className="w-full h-full py-3 pr-3 pl-10 font-mono text-sm bg-slate-700 text-gray-200 border-none outline-none resize-none leading-6"
                    placeholder="Paste your CSS here..."
                    value={inputCSS}
                    onChange={(e) => setInputCSS(e.target.value)}
                    spellCheck="false"
                  />
                </div>
              </div>

              {/* Filtered RTL CSS with action buttons */}
              <div className="p-4 border-t md:border-t-0 border-slate-700 md:border-0">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300">Filtered RTL CSS:</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {outputLineCount} line{outputLineCount !== 1 ? 's' : ''}
                    </span>
                    {/* Output actions */}
                    <div className="flex gap-1">
                      <button
                        onClick={handleCopyCSS}
                        disabled={!outputCSS}
                        className={`text-gray-400 hover:text-gray-200 bg-slate-800 hover:bg-slate-700 p-1 rounded ${!outputCSS ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Copy CSS"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      </button>
                      <button
                        onClick={handleDownloadCSS}
                        disabled={!outputCSS}
                        className={`text-gray-400 hover:text-gray-200 bg-slate-800 hover:bg-slate-700 p-1 rounded ${!outputCSS ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Download CSS"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <pre className="language-css h-64 md:h-80 overflow-auto rounded-md border border-slate-600 bg-slate-700 text-sm p-3 whitespace-pre-wrap">
                  {outputCSS.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-gray-500 w-8 select-none text-right pr-2">{i + 1}</span>
                      <span className="text-indigo-300 font-medium">{line}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Footer with action buttons */}
            <div className="px-4 md:px-6 py-3 bg-slate-900 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-gray-500">
                {outputCSS ? `${outputLineCount} lines of RTL CSS generated` : 'Ready to convert'}
              </div>

              <div className="flex gap-2 md:gap-3 w-full sm:w-auto flex-wrap justify-center">
                <button
                  onClick={handleCopyCSS}
                  disabled={!outputCSS}
                  className={`bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-md transition flex items-center justify-center ${!outputCSS ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                  Copy CSS
                </button>
                <button
                  onClick={handleDownloadCSS}
                  disabled={!outputCSS}
                  className={`bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-md transition flex items-center justify-center ${!outputCSS ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download CSS
                </button>
              </div>
            </div>
          </div>
      </main>

      {/* Notification */}
      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
}