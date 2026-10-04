// Shared by tools/e2e.mjs and tools/audio-levels.mjs: find a local Chromium-based browser, pick free ports.
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';

export function findBrowser() {
  if (process.env.CHROME) return process.env.CHROME;
  const pf = [process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.LOCALAPPDATA].filter(Boolean);
  const list = process.platform === 'win32'
    ? pf.flatMap(p => [path.join(p, 'Google/Chrome/Application/chrome.exe'), path.join(p, 'Microsoft/Edge/Application/msedge.exe')])
    : process.platform === 'darwin'
      ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium']
      : ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'microsoft-edge'].flatMap(b => ['/usr/bin/', '/usr/local/bin/', '/snap/bin/'].map(d => d + b));
  return list.find(p => fs.existsSync(p));
}
export const freePort = () => new Promise(r => { const s = net.createServer().listen(0, () => { const { port } = s.address(); s.close(() => r(port)); }); });
