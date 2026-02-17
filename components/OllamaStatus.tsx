
import React, { useState, useEffect, useCallback } from 'react';
import { OllamaModel, OllamaResponse } from '../types';

const OllamaStatus: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
  const [models, setModels] = useState<OllamaModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  const checkOllama = useCallback(async () => {
    setStatus('checking');
    setError(null);
    try {
      // Browsers will block this if OLLAMA_ORIGINS is not set correctly
      const response = await fetch('http://localhost:11434/api/tags');
      if (!response.ok) throw new Error('Ollama API returned an error');
      const data: OllamaResponse = await response.json();
      setModels(data.models);
      setStatus('connected');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setError(err.message || 'Failed to connect to local Ollama. Ensure it is running and CORS is configured.');
    }
  }, []);

  useEffect(() => {
    checkOllama();
  }, [checkOllama]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <i className="fas fa-microchip text-indigo-600"></i>
          Local Ollama Status
        </h2>
        <button 
          onClick={checkOllama}
          className="text-sm px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors flex items-center gap-2"
        >
          <i className={`fas fa-sync-alt ${status === 'checking' ? 'animate-spin' : ''}`}></i>
          Refresh
        </button>
      </div>

      {status === 'connected' ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <i className="fas fa-check-circle"></i>
            Connected to localhost:11434
          </div>
          <div className="text-sm text-slate-500 mb-2">Detected {models.length} installed models:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {models.map(model => (
              <div key={model.digest} className="p-3 border border-slate-100 rounded-lg bg-slate-50 hover:border-indigo-200 transition-all">
                <div className="font-semibold text-slate-800">{model.name}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  {(model.size / (1024 * 1024 * 1024)).toFixed(2)} GB • {model.details.parameter_size}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : status === 'error' ? (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <div className="flex items-start gap-3 text-amber-800">
            <i className="fas fa-exclamation-triangle mt-1"></i>
            <div>
              <p className="font-bold">Unable to connect to Ollama</p>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-sm mt-3 font-semibold">Common fixes:</p>
              <ul className="text-xs list-disc ml-4 mt-1 space-y-1">
                <li>Is Ollama running? (Check taskbar/menu bar)</li>
                <li>Set <code>OLLAMA_ORIGINS="*"</code> environment variable</li>
                <li>Restart Ollama after changing env variables</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center p-10">
          <div className="animate-pulse text-slate-400">Searching for local instance...</div>
        </div>
      )}
    </div>
  );
};

export default OllamaStatus;
