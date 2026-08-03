import React, { useState } from 'react';
import { GitBranch, Layers, Terminal, CheckCircle2, Copy, ExternalLink, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

export default function DeploymentBridge() {
  const [activeStep, setActiveStep] = useState(1);
  const [githubRepo, setGithubRepo] = useState('user/my-awesome-website');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployLogs, setDeployLogs] = useState([]);
  const [deployedUrl, setDeployedUrl] = useState('');
  const [copiedCmd, setCopiedCmd] = useState(null);

  const gitCommands = [
    `git init`,
    `git add .`,
    `git commit -m "Initial website release from BlackLine Creative"`,
    `git branch -M main`,
    `git remote add origin https://github.com/${githubRepo}.git`,
    `git push -u origin main`
  ];

  const vercelCommands = [
    `npx --yes vercel`
  ];

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleSimulateVercelDeploy = () => {
    setIsDeploying(true);
    setDeployLogs(['> Initializing Vercel deployment engine...']);

    setTimeout(() => {
      setDeployLogs(prev => [...prev, '> Inspecting repository & framework (React + Vite detected)']);
    }, 800);

    setTimeout(() => {
      setDeployLogs(prev => [...prev, '> Building production bundle with Vite...']);
    }, 1800);

    setTimeout(() => {
      setDeployLogs(prev => [...prev, '> Uploading static assets to Vercel Global Edge Network']);
    }, 2800);

    setTimeout(() => {
      setDeployLogs(prev => [...prev, '> Assigning SSL certificate & custom domain routing...']);
    }, 3800);

    setTimeout(() => {
      setIsDeploying(false);
      const url = `https://${githubRepo.split('/')[1] || 'blackline-site'}.vercel.app`;
      setDeployedUrl(url);
      setDeployLogs(prev => [...prev, `✅ SUCCESS! Site is live at ${url}`]);
    }, 4800);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/30 text-xs font-bold text-[#A0C4FF]">
          <Sparkles className="w-4 h-4 text-[#38BDF8]" />
          <span>Automated Deployment Bridge</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Connect to GitHub & Deploy to Vercel
        </h2>
        <p className="text-sm text-[#94A3B8]">
          Follow these quick steps to push your purchased website codebase to your personal GitHub account and host it live on Vercel.
        </p>
      </div>

      {/* Step Stepper Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
        <button
          onClick={() => setActiveStep(1)}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeStep === 1
              ? 'bg-[#A0C4FF]/15 border-[#38BDF8] text-white shadow-lg shadow-[#38BDF8]/10'
              : 'glass-panel text-[#94A3B8] hover:border-[#A0C4FF]/30'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A0C4FF]/20 to-[#38BDF8]/20 flex items-center justify-center text-[#A0C4FF] font-bold shrink-0">
            <GitBranch className="w-5 h-5 text-[#38BDF8]" />
          </div>
          <div>
            <div className="text-xs text-[#A0C4FF] font-semibold">Step 1</div>
            <div className="text-sm font-bold text-white">GitHub Repository Push</div>
          </div>
        </button>

        <button
          onClick={() => setActiveStep(2)}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeStep === 2
              ? 'bg-[#A0C4FF]/15 border-[#38BDF8] text-white shadow-lg shadow-[#38BDF8]/10'
              : 'glass-panel text-[#94A3B8] hover:border-[#A0C4FF]/30'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A0C4FF]/20 to-[#38BDF8]/20 flex items-center justify-center text-[#A0C4FF] font-bold shrink-0">
            <Layers className="w-5 h-5 text-[#A0C4FF]" />
          </div>
          <div>
            <div className="text-xs text-[#A0C4FF] font-semibold">Step 2</div>
            <div className="text-sm font-bold text-white">Vercel One-Click Hosting</div>
          </div>
        </button>
      </div>

      {/* Step 1: GitHub Instructions */}
      {activeStep === 1 && (
        <div className="glass-panel p-8 rounded-3xl border border-[#A0C4FF]/20 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#A0C4FF]/15 pb-4">
            <div className="flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-[#38BDF8]" />
              <h3 className="text-lg font-bold text-white">Connect Local Project to GitHub</h3>
            </div>
            <span className="text-xs font-mono text-[#A0C4FF] px-3 py-1 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/20">
              Target Branch: main
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-2">
              Your Target GitHub Repository Path:
            </label>
            <input
              type="text"
              value={githubRepo}
              onChange={(e) => setGithubRepo(e.target.value)}
              placeholder="username/repo-name"
              className="w-full max-w-md px-4 py-2.5 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-white font-mono text-xs focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span>Run these terminal commands in your downloaded website root:</span>
              <button
                onClick={() => handleCopy(gitCommands.join('\n'), 'all_git')}
                className="text-[#38BDF8] hover:underline flex items-center gap-1 text-[11px]"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedCmd === 'all_git' ? 'All Copied!' : 'Copy All Commands'}</span>
              </button>
            </div>

            <div className="bg-[#070A0F] p-4 rounded-2xl border border-[#A0C4FF]/15 font-mono text-xs text-[#B9D6F2] space-y-2">
              {gitCommands.map((cmd, idx) => (
                <div key={idx} className="flex items-center justify-between group py-1">
                  <span className="text-emerald-400 font-bold mr-2">$ <span className="text-white font-normal">{cmd}</span></span>
                  <button
                    onClick={() => handleCopy(cmd, `cmd_${idx}`)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#94A3B8] hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setActiveStep(2)}
              className="btn-pastel-primary px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <span>Next: Vercel Deployment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Vercel Instructions & Live Terminal Simulator */}
      {activeStep === 2 && (
        <div className="glass-panel p-8 rounded-3xl border border-[#A0C4FF]/20 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#A0C4FF]/15 pb-4">
            <div className="flex items-center gap-3">
              <Layers className="w-6 h-6 text-[#38BDF8]" />
              <h3 className="text-lg font-bold text-white">Deploy Live on Vercel</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-bold">
              Automated Vercel CLI 58+
            </span>
          </div>

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Vercel automatically detects React + Vite projects. Run the official Vercel CLI directly from your terminal or trigger a simulated test deployment below.
          </p>

          <div className="p-4 bg-[#070A0F] rounded-2xl border border-[#A0C4FF]/15 flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-[#94A3B8] text-[10px] block uppercase">Vercel CLI Execution Command</span>
              <span className="text-emerald-400 font-bold">$ <span className="text-white">npx --yes vercel</span></span>
            </div>
            <button
              onClick={() => handleCopy('npx --yes vercel', 'vercel_cmd')}
              className="px-4 py-2 rounded-xl bg-[#A0C4FF]/10 text-[#A0C4FF] font-semibold text-xs border border-[#A0C4FF]/20 hover:bg-[#A0C4FF]/20"
            >
              {copiedCmd === 'vercel_cmd' ? 'Copied!' : 'Copy Command'}
            </button>
          </div>

          {/* Interactive Live Terminal Simulator */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#38BDF8]" />
                <span>Interactive Deployment Console Simulator</span>
              </span>
              
              <button
                onClick={handleSimulateVercelDeploy}
                disabled={isDeploying}
                className="btn-pastel-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                {isDeploying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Building & Deploying...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Test Vercel Build</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Window */}
            <div className="bg-[#070A0F] p-4 rounded-2xl border border-[#A0C4FF]/20 font-mono text-xs h-48 overflow-y-auto space-y-1.5 shadow-inner">
              {deployLogs.length === 0 ? (
                <div className="text-[#94A3B8]/50 italic">Click "Test Vercel Build" to simulate live deployment build...</div>
              ) : (
                deployLogs.map((log, i) => (
                  <div key={i} className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : 'text-[#B9D6F2]'}>
                    {log}
                  </div>
                ))
              )}
            </div>

            {deployedUrl && (
              <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Deployment Live URL</span>
                  <div className="text-sm font-bold text-white font-mono">{deployedUrl}</div>
                </div>
                <a
                  href={deployedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-[#070A0F] font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-colors"
                >
                  <span>Open Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}
