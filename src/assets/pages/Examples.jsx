import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ExamplePage() {
  // Sample CSS examples with RTL transformations
  const examples = [
    {
      id: 1,
      title: 'Basic Positioning',
      ltrCSS: `/* LTR CSS */
.sidebar {
  float: left;
  margin-right: 20px;
  text-align: left;
}

.content {
  left: 100px;
  padding-left: 15px;
  border-left: 1px solid #ccc;
}`,
      rtlCSS: `/* RTL CSS */
.sidebar {
  float: right;
  margin-left: 20px;
  text-align: right;
}

.content {
  right: 100px;
  padding-right: 15px;
  border-right: 1px solid #ccc;
}`,
      explanation: 'In RTL languages, the reading and layout flow is reversed. Properties like float, margin, padding, text-align, and positioning need to be mirrored.'
    },
    {
      id: 2,
      title: 'Background Positions',
      ltrCSS: `/* LTR CSS */
.icon {
  background-position: left center;
  background-image: url("arrow-right.svg");
}

.hero {
  background-position: 10% 50%;
}`,
      rtlCSS: `/* RTL CSS */
.icon {
  background-position: right center;
  background-image: url("arrow-left.svg");
}

.hero {
  background-position: 90% 50%;
}`,
      explanation: 'Background positions need to be flipped horizontally. Also, directional images like arrows need to be reversed to maintain correct visual flow.'
    },
    {
      id: 3,
      title: 'Transforms & Animations',
      ltrCSS: `/* LTR CSS */
.card {
  transform: translateX(20px) skewX(15deg);
}

@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}`,
      rtlCSS: `/* RTL CSS */
.card {
  transform: translateX(-20px) skewX(-15deg);
}

@keyframes slide-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}`,
      explanation: 'Transforms and animations that involve horizontal movement or skewing need to be mirrored to maintain the same visual effect in RTL layouts.'
    }
  ];

  const [activeExample, setActiveExample] = useState(examples[0]);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-300 mb-4">CSS to RTL Examples</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            See how css2rtl transforms your CSS for right-to-left languages. Our tool ensures your designs work seamlessly across different language orientations.
          </p>
        </div>

        {/* Example selector tabs - Mobile scrollable on small screens */}
        <div className="border-b border-gray-700 mb-8 overflow-hidden overflow-x-auto">
          <nav className="flex whitespace-nowrap -mb-px">
            {examples.map((example) => (
              <button
                key={example.id}
                className={`py-3 px-4 sm:py-4 sm:px-6 font-medium text-sm rounded-t-lg transition mr-2 ${
                  activeExample.id === example.id
                    ? 'bg-indigo-700 text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
                onClick={() => setActiveExample(example)}
              >
                {example.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Example Content - Stack vertically on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* LTR Section */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 text-gray-200 px-4 sm:px-6 py-3 font-mono">
              LTR (Left-to-Right) CSS
            </div>
            <div className="p-4 sm:p-6">
              <pre className="language-css bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-300">
                <code>{activeExample.ltrCSS}</code>
              </pre>
            </div>
          </div>

          {/* RTL Section */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-indigo-800 text-gray-200 px-4 sm:px-6 py-3 font-mono">
              RTL (Right-to-Left) CSS
            </div>
            <div className="p-4 sm:p-6">
              <pre className="language-css bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-300">
                <code>{activeExample.rtlCSS}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-indigo-900/40 border-l-4 border-indigo-500 p-4 sm:p-6 rounded-r-lg mb-12">
          <h3 className="text-lg font-semibold text-indigo-300 mb-2">How It Works</h3>
          <p className="text-indigo-100">{activeExample.explanation}</p>
        </div>

        {/* Live Preview Section */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-indigo-300">Live Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* LTR Preview */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-700 text-gray-200 px-4 sm:px-6 py-3">
                LTR Preview
              </div>
              <div className="p-4 sm:p-6 min-h-64 bg-gray-900">
                <div className="relative border border-dashed border-gray-600 p-4 h-48">
                  {activeExample.id === 1 && (
                    <div className="flex h-full">
                      <div className="bg-gray-700 p-4 mr-4 text-left">
                        Sidebar (float: left)
                      </div>
                      <div className="flex-grow pl-4 border-l border-gray-600 text-left">
                        Content with left padding and left border
                      </div>
                    </div>
                  )}
                  
                  {activeExample.id === 2 && (
                    <div className="h-full">
                      <div className="mb-4 bg-gray-700 p-3 flex items-center">
                        <div className="w-6 h-6 bg-indigo-600 mr-2"></div>
                        Icon aligned left
                      </div>
                      <div className="h-24 relative bg-gradient-to-r from-indigo-600 to-transparent">
                        Background positioned at 10%
                      </div>
                    </div>
                  )}
                  
                  {activeExample.id === 3 && (
                    <div className="h-full flex flex-col justify-center">
                      <div className="transform translate-x-5 skew-x-6 bg-indigo-900/50 p-4 mb-4 w-64 mx-auto text-center">
                        Transformed Element
                      </div>
                      <div className="animate-pulse bg-indigo-700/50 p-4 w-64 mx-auto text-center">
                        Animated Element
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* RTL Preview */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-indigo-800 text-gray-200 px-4 sm:px-6 py-3">
                RTL Preview
              </div>
              <div className="p-4 sm:p-6 min-h-64 bg-gray-900" dir="rtl">
                <div className="relative border border-dashed border-gray-600 p-4 h-48">
                  {activeExample.id === 1 && (
                    <div className="flex h-full">
                      <div className="bg-gray-700 p-4 ml-4 text-right">
                        Sidebar (float: right)
                      </div>
                      <div className="flex-grow pr-4 border-r border-gray-600 text-right">
                        Content with right padding and right border
                      </div>
                    </div>
                  )}
                  
                  {activeExample.id === 2 && (
                    <div className="h-full">
                      <div className="mb-4 bg-gray-700 p-3 flex items-center justify-end">
                        Icon aligned right
                        <div className="w-6 h-6 bg-indigo-600 ms-2"></div>
                      </div>
                      <div className="h-24 relative bg-gradient-to-l from-indigo-600 to-transparent">
                        Background positioned at 90%
                      </div>
                    </div>
                  )}
                  
                  {activeExample.id === 3 && (
                    <div className="h-full flex flex-col justify-center">
                      <div className="transform -translate-x-5 -skew-x-6 bg-indigo-900/50 p-4 mb-4 w-64 mx-auto text-center">
                        Transformed Element
                      </div>
                      <div className="animate-pulse bg-indigo-700/50 p-4 w-64 mx-auto text-center">
                        Animated Element
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-indigo-800 to-purple-900 rounded-xl p-6 sm:p-8 text-white shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Convert Your CSS?</h2>
          <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
            Try our powerful CSS to RTL conversion tool now and make your website fully accessible to RTL language users.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Try the Tool
            </Link>
            <Link
              to="/documentation"
              className="bg-transparent text-white border border-indigo-400 hover:bg-indigo-900/50 font-medium py-3 px-6 rounded-lg transition"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}