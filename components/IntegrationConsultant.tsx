
import React, { useState } from 'react';
import { getIntegrationAdvice } from '../services/geminiService';

const IntegrationConsultant: React.FC = () => {
  const [tech, setTech] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tech.trim()) return;
    setLoading(true);
    try {
      const result = await getIntegrationAdvice(tech);
      setAdvice(result || 'No advice received.');
    } catch (err) {
      setAdvice('Error calling Gemini API. Please check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-900 text-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <i className="fas fa-robot"></i>
          AI Integration Consultant
        </h2>
        <p className="text-indigo-200 text-sm mb-6">
          Tell me your tech stack (e.g., "Python Flask", "Next.js", "Docker"), and I'll generate the integration steps for you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <input 
            type="text"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            placeholder="e.g. Flutter mobile app"
            className="flex-1 bg-indigo-800/50 border border-indigo-700 rounded-lg px-4 py-3 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button 
            type="submit"
            disabled={loading || !tech.trim()}
            className="bg-white text-indigo-900 font-bold px-6 py-3 rounded-lg hover:bg-indigo-50 disabled:opacity-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-magic"></i>}
            Generate Guide
          </button>
        </form>

        {advice && (
          <div className="mt-8 bg-slate-900/50 rounded-lg border border-indigo-700/30 p-6 overflow-y-auto max-h-[500px] prose prose-invert prose-sm max-w-none">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-indigo-800">
              <span className="font-bold text-indigo-300">Guide for: {tech}</span>
              <button onClick={() => setAdvice(null)} className="text-indigo-400 hover:text-white"><i className="fas fa-times"></i></button>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-slate-200">
              {advice}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationConsultant;
