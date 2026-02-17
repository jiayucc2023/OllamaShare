
import React, { useState } from 'react';
import CodeBlock from './components/CodeBlock';
import OllamaStatus from './components/OllamaStatus';
import IntegrationConsultant from './components/IntegrationConsultant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intro' | 'env' | 'api' | 'apps'>('intro');

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-2xl text-indigo-600 tracking-tight">
            <i className="fas fa-cloud-bolt"></i>
            <span>Ollama<span className="text-slate-900">Share</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <a href="#guide" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#tester" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Connection Tester</a>
            <a href="https://ollama.com" target="_blank" className="ml-4 bg-slate-900 text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-indigo-600 transition-all">Official Site</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Share your local LLMs with <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">any application</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ollama is powerful, but by default it's restricted to your machine. 
            Learn how to open its API for third-party tools, web apps, and custom code.
          </p>
        </section>

        {/* Connection Tester */}
        <section id="tester">
           <OllamaStatus />
        </section>

        {/* AI Guide */}
        <section>
          <IntegrationConsultant />
        </section>

        {/* Detailed Guide */}
        <section id="guide" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50 overflow-x-auto scrollbar-hide">
            {(['intro', 'env', 'api', 'apps'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[120px] py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === tab 
                  ? 'border-indigo-600 text-indigo-600 bg-white' 
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab === 'intro' && 'How it Works'}
                {tab === 'env' && 'CORS & Config'}
                {tab === 'api' && 'REST API'}
                {tab === 'apps' && 'Third Party'}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-10 min-h-[400px]">
            {activeTab === 'intro' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-2xl font-bold text-slate-900">Sharing is via the built-in Server</h3>
                <p className="text-slate-600">
                  Ollama runs a local HTTP server automatically. Every model you pull (like <code>llama3</code> or <code>mistral</code>) is accessible through this server.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                    <i className="fas fa-server text-indigo-600 text-2xl mb-3"></i>
                    <h4 className="font-bold mb-2">Internal API</h4>
                    <p className="text-sm text-slate-500">Ollama exposes endpoints for generating text, chat, and managing models.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                    <i className="fas fa-shield-halved text-amber-600 text-2xl mb-3"></i>
                    <h4 className="font-bold mb-2">Default Security</h4>
                    <p className="text-sm text-slate-500">By default, it only listens to <code>127.0.0.1</code> and blocks external origins (CORS).</p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                    <i className="fas fa-link text-emerald-600 text-2xl mb-3"></i>
                    <h4 className="font-bold mb-2">Universal Access</h4>
                    <p className="text-sm text-slate-500">With 2 environment variables, you can share it with Docker, LAN, or Web apps.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'env' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-2xl font-bold text-slate-900">The Secret Sauce: Environment Variables</h3>
                <p className="text-slate-600">To share Ollama, you must configure how the server binds to your network and which origins it allows.</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center">1</span>
                      OLLAMA_HOST
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">Set to <code>0.0.0.0</code> to allow connection from other devices on your network.</p>
                    <CodeBlock code="OLLAMA_HOST=0.0.0.0" language="bash" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center">2</span>
                      OLLAMA_ORIGINS
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">Set to <code>*</code> to allow Web Applications (like this one) to talk to your API.</p>
                    <CodeBlock code='OLLAMA_ORIGINS="*"' language="bash" />
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg mt-6">
                  <h5 className="font-bold text-white mb-2"><i className="fab fa-windows mr-2"></i>How to set on Windows (System):</h5>
                  <ol className="text-sm list-decimal ml-5 space-y-1">
                    <li>Open Search &gt; "Environment Variables"</li>
                    <li>Click "New" under System Variables</li>
                    <li>Add <code>OLLAMA_ORIGINS</code> with value <code>*</code></li>
                    <li>Restart the Ollama App from the taskbar</li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-10 animate-fadeIn">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Programmatic Integration</h3>
                  <p className="text-slate-600">Ollama follows a clean REST architecture. You can interact with it using standard tools like <code>curl</code>, or any programming language.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Chat Completion */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <i className="fas fa-comment-dots text-indigo-500"></i>
                      Chat Completion (JavaScript)
                    </h4>
                    <p className="text-xs text-slate-500">Endpoint: <code>POST /api/chat</code></p>
                    <CodeBlock code={`// Modern Web / Node.js
const response = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3',
    messages: [{ role: 'user', content: 'Explain quantum computing.' }],
    stream: false
  })
});
const data = await response.json();
console.log(data.message.content);`} language="javascript" />
                  </div>

                  {/* Generate Embeddings */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <i className="fas fa-brain text-purple-500"></i>
                      Generate Embeddings (Python)
                    </h4>
                    <p className="text-xs text-slate-500">Endpoint: <code>POST /api/embeddings</code></p>
                    <CodeBlock code={`import requests

url = "http://localhost:11434/api/embeddings"
payload = {
    "model": "all-minilm",
    "prompt": "The sky is blue because of Rayleigh scattering."
}

response = requests.post(url, json=payload)
embeddings = response.json()["embedding"]
print(f"Vector length: {len(embeddings)}")`} language="python" />
                  </div>

                  {/* Pull Model */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <i className="fas fa-download text-emerald-500"></i>
                      Pull a New Model (Node.js)
                    </h4>
                    <p className="text-xs text-slate-500">Endpoint: <code>POST /api/pull</code></p>
                    <CodeBlock code={`// Pulling a model via API
const pullModel = async (name) => {
  const res = await fetch('http://localhost:11434/api/pull', {
    method: 'POST',
    body: JSON.stringify({ name, stream: false })
  });
  if (res.ok) console.log(\`Model \${name} pulled successfully\`);
};

pullModel('mistral');`} language="javascript" />
                  </div>

                  {/* Show Model Info */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <i className="fas fa-info-circle text-blue-500"></i>
                      Show Model Info (Curl)
                    </h4>
                    <p className="text-xs text-slate-500">Endpoint: <code>POST /api/show</code></p>
                    <CodeBlock code={`curl http://localhost:11434/api/show -d '{
  "name": "llama3"
}'`} language="bash" />
                  </div>

                  {/* List Models */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <i className="fas fa-list text-slate-500"></i>
                      List Loaded Models (Curl)
                    </h4>
                    <p className="text-xs text-slate-500">Endpoint: <code>GET /api/tags</code></p>
                    <CodeBlock code="curl http://localhost:11434/api/tags" language="bash" />
                  </div>

                   {/* Delete Model */}
                   <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <i className="fas fa-trash-alt text-red-500"></i>
                      Delete a Model (Curl)
                    </h4>
                    <p className="text-xs text-slate-500">Endpoint: <code>DELETE /api/delete</code></p>
                    <CodeBlock code={`curl -X DELETE http://localhost:11434/api/delete -d '{
  "name": "llama2:13b"
}'`} language="bash" />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-4">
                  <p className="text-sm text-amber-800">
                    <i className="fas fa-lightbulb mr-2"></i>
                    <strong>Pro Tip:</strong> By default, Ollama streams responses chunk-by-chunk. Set <code>"stream": false</code> in your JSON payload to get a single consolidated response if your app doesn't support streaming.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'apps' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-2xl font-bold text-slate-900">Popular Apps for Ollama</h3>
                <p className="text-slate-600">These community tools can connect to your local Ollama immediately once configured.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-all">
                    <h4 className="font-bold text-indigo-600 mb-1">Open WebUI</h4>
                    <p className="text-xs text-slate-500 mb-3">The best self-hosted ChatGPT-like interface.</p>
                    <a href="https://github.com/open-webui/open-webui" target="_blank" className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md">Github Page &rarr;</a>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-all">
                    <h4 className="font-bold text-indigo-600 mb-1">Continue.dev</h4>
                    <p className="text-xs text-slate-500 mb-3">Open-source VS Code/JetBrains extension.</p>
                    <a href="https://continue.dev" target="_blank" className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md">Plugin Page &rarr;</a>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-all">
                    <h4 className="font-bold text-indigo-600 mb-1">AnythingLLM</h4>
                    <p className="text-xs text-slate-500 mb-3">Full-stack desktop app for local RAG.</p>
                    <a href="https://useanything.com" target="_blank" className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md">Official Page &rarr;</a>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-all">
                    <h4 className="font-bold text-indigo-600 mb-1">Enchanted</h4>
                    <p className="text-xs text-slate-500 mb-3">iOS, macOS, and visionOS app for Ollama.</p>
                    <a href="https://github.com/AugustDev/enchanted" target="_blank" className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md">App Store &rarr;</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">Can I use it on a separate phone?</h4>
              <p className="text-sm text-slate-600">Yes! If you set <code>OLLAMA_HOST=0.0.0.0</code>, you can access Ollama from your phone using your computer's IP address (e.g., <code>192.168.1.5:11434</code>).</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">Is it secure to open the API?</h4>
              <p className="text-sm text-slate-600">Ollama doesn't have built-in authentication. If you set <code>0.0.0.0</code>, anyone on your local network can use your GPU. Use a VPN or reverse proxy (like Nginx) for public access.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">How many apps can connect at once?</h4>
              <p className="text-sm text-slate-600">Technically as many as you want, but performance depends on your VRAM. If multiple apps send requests simultaneously, they will be queued by Ollama.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">Does Docker need special config?</h4>
              <p className="text-sm text-slate-600">Yes. If running another app in Docker, use <code>host.docker.internal:11434</code> as the URL to reach the host machine's Ollama.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-10 text-center">
        <p className="text-slate-400 text-sm">
          Made with <i className="fas fa-heart text-red-400 mx-1"></i> for the Ollama Community.
        </p>
      </footer>

      {/* Styles for animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
