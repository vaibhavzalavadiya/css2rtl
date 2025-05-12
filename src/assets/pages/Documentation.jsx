// pages/Documentation.jsx
import React from 'react';
export default function DocumentationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <main className="py-8 px-6">
        <div className="container mx-auto">
          <div className="bg-slate-800 shadow-xl rounded-lg overflow-hidden border border-slate-700">
            {/* Title Banner */}
            <div className="bg-indigo-800 text-white p-6">
              <h2 className="text-3xl font-bold text-center">
                RTL CSS Filter Tool Documentation
              </h2>
              <p className="text-center mt-2 text-indigo-200">
                A comprehensive guide to converting CSS for Right-to-Left layouts
              </p>
            </div>

            {/* Content Area */}
            <div className="p-8 space-y-8 text-gray-300">
              {/* Overview */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-100 border-b border-slate-600 pb-2 mb-4">
                  Overview
                </h3>
                <p className="leading-relaxed">
                  The <strong className="text-indigo-300">RTL CSS Filter Tool</strong> helps you convert and filter your
                  CSS for Right-to-Left (RTL) layout support by extracting only
                  direction-related properties. Ideal for environments (like app
                  marketplaces) that strictly enforce RTL compliance.
                </p>
              </section>

              {/* Features */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-100 border-b border-slate-600 pb-2 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Extracts only direction-sensitive CSS properties (e.g., <code className="bg-slate-700 px-1 rounded">padding-left</code>, <code className="bg-slate-700 px-1 rounded">margin-right</code>).
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Automatically flips <code className="bg-slate-700 px-1 rounded">left</code> ⟷ <code className="bg-slate-700 px-1 rounded">right</code>, and <code className="bg-slate-700 px-1 rounded">padding-left</code> ⟷ <code className="bg-slate-700 px-1 rounded">padding-right</code>.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Supports <code className="bg-slate-700 px-1 rounded">translateX()</code> and <code className="bg-slate-700 px-1 rounded">rotate()</code> transforms, flipping their axes.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Zeroes out original directional values for a clean override.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    <strong className="text-indigo-300">Include non-RTL</strong> option preserves all other CSS
                    (colors, fonts, display, etc.) alongside direction overrides.
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Copy or download filtered CSS with one click.
                  </li>
                </ul>
              </section>

              {/* Usage Example */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-100 border-b border-slate-600 pb-2 mb-4">
                  Usage Example
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <div className="text-sm font-medium text-gray-400 mb-2">Input CSS:</div>
                    <pre className="bg-slate-800 p-4 rounded text-sm overflow-auto text-indigo-300 font-mono">
{`.container {
  width: 100%;
  padding-left: 20px;
  margin-right: 15px;
}`}
                    </pre>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <div className="text-sm font-medium text-gray-400 mb-2">Output (Include Non-RTL = false):</div>
                    <pre className="bg-slate-800 p-4 rounded text-sm overflow-auto text-indigo-300 font-mono">
{`.container {
  padding-left: 0;
  margin-right: 0;
  padding-right: 20px;
  margin-left: 15px;
}`}
                    </pre>
                  </div>
                </div>
              </section>

              {/* How to Use */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-100 border-b border-slate-600 pb-2 mb-4">
                  How to Use
                </h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">1</span>
                    <span>Paste your CSS code into the <strong className="text-indigo-300">Original CSS</strong> textarea.</span>
                  </li>
                  <li className="flex">
                    <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">2</span>
                    <span>Toggle <strong className="text-indigo-300">Include non-RTL properties</strong> to keep or strip non-directional styles.</span>
                  </li>
                  <li className="flex">
                    <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">3</span>
                    <span>Click <strong className="text-indigo-300">Convert to RTL</strong> to generate your filtered CSS.</span>
                  </li>
                  <li className="flex">
                    <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">4</span>
                    <span>Use <strong className="text-indigo-300">Copy CSS</strong> to copy or <strong className="text-indigo-300">Download CSS</strong> to save as a file.</span>
                  </li>
                </ol>
              </section>

              {/* Limitations & Support */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-100 border-b border-slate-600 pb-2 mb-4">
                  Limitations & Support
                </h3>
                <div className="bg-indigo-900 bg-opacity-50 border-l-4 border-indigo-500 p-4 rounded-r mb-4">
                  <p className="text-indigo-200">
                    This tool focuses strictly on LTR-to-RTL directional conversion and does not
                    modify layout or logical properties beyond those listed.
                  </p>
                </div>
                <p className="mb-4">
                  For advanced RTL needs (e.g., <code className="bg-slate-700 px-1 rounded">inset-inline</code>, <code className="bg-slate-700 px-1 rounded">margin-inline</code>), consider
                  additional processing or manual adjustments.
                </p>
                <div className="bg-slate-900 p-4 rounded-lg text-center border border-slate-700">
                  <p>
                    For feedback or bug reports, visit our
                    <a href="#" className="text-indigo-400 font-medium hover:underline mx-1">GitHub Issues</a> page.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}