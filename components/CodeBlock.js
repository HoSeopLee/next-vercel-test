import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CopyButton = ({ text }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button
      className="absolute right-0 top-0 bg-gray-800 text-white text-sm font-bold py-1 px-2 rounded"
      onClick={handleClick}
    >
      Copy
    </button>
  );
};

export default function CodeBlock({ children }) {
  return (
    <div className="relative">
      <CopyButton text={children} />
      <SyntaxHighlighter showLineNumbers={true} style={rainbow}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
