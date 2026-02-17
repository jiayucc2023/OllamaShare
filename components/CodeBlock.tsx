
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group bg-slate-900 rounded-lg p-4 my-2 overflow-x-auto border border-slate-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-slate-400 font-mono uppercase">{language || 'text'}</span>
        <button 
          onClick={copyToClipboard}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <i className={`fas ${copied ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
        </button>
      </div>
      <pre className="text-sm font-mono text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
