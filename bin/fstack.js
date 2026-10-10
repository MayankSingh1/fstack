#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const VERSION = '1.2.0';
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const SKILLS_SOURCE = path.join(PACKAGE_ROOT, 'skills');

const PLATFORMS = {
  cursor: {
    name: 'Cursor',
    local: '.cursor/skills/fstack',
    global: path.join(os.homedir(), '.cursor', 'skills', 'fstack'),
    description: 'Cursor IDE'
  },
  'claude-code': {
    name: 'Claude Code',
    local: '.claude/commands/fstack',
    global: path.join(os.homedir(), '.claude', 'commands', 'fstack'),
    description: 'Anthropic Claude Code'
  },
  codex: {
    name: 'Codex',
    local: '.codex/skills/fstack',
    global: path.join(os.homedir(), '.codex', 'skills', 'fstack'),
    description: 'OpenAI Codex'
  },
  antigravity: {
    name: 'Antigravity IDE',
    local: '.antigravity/skills/fstack',
    global: path.join(os.homedir(), '.antigravity', 'skills', 'fstack'),
    description: 'Antigravity IDE'
  },
  opencode: {
    name: 'Open Code',
    local: '.opencode/skills/fstack',
    global: path.join(os.homedir(), '.opencode', 'skills', 'fstack'),
    description: 'Open Code'
  },
  windsurf: {
    name: 'Windsurf',
    local: '.windsurf/skills/fstack',
    global: path.join(os.homedir(), '.windsurf', 'skills', 'fstack'),
    description: 'Codeium Windsurf'
  },
  copilot: {
    name: 'GitHub Copilot',
    local: '.github/copilot/skills/fstack',
    global: path.join(os.homedir(), '.config', 'github-copilot', 'skills', 'fstack'),
    description: 'GitHub Copilot'
  }
};

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source not found: ${src}`);
    return false;
  }

  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
  return true;
}

function countSkills() {
  let count = 0;
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name));
      } else if (entry.name === 'SKILL.md') {
        count++;
      }
    }
  }
  walk(SKILLS_SOURCE);
  return count;
}

function install(platform, scope = 'local', targetPath = null) {
  let dest;
  
  if (targetPath) {
    dest = path.resolve(targetPath);
  } else if (platform === 'all') {
    console.log('\n📦 Installing fstack to all detected platforms...\n');
    let installed = 0;
    for (const [key, config] of Object.entries(PLATFORMS)) {
      const globalDir = path.dirname(config.global);
      const localDir = path.dirname(path.resolve(config.local));
      
      if (fs.existsSync(globalDir) || fs.existsSync(localDir)) {
        const target = scope === 'global' ? config.global : path.resolve(config.local);
        if (copyRecursive(SKILLS_SOURCE, target)) {
          console.log(`  ✓ ${config.name}: ${target}`);
          installed++;
        }
      }
    }
    if (installed === 0) {
      console.log('  No supported platforms detected. Use --platform to specify one.');
    }
    console.log(`\n✨ Installed to ${installed} platform(s)\n`);
    return;
  } else {
    const config = PLATFORMS[platform];
    if (!config) {
      console.error(`Unknown platform: ${platform}`);
      console.log('Supported platforms:', Object.keys(PLATFORMS).join(', '));
      process.exit(1);
    }
    dest = scope === 'global' ? config.global : path.resolve(config.local);
  }

  console.log(`\n📦 Installing fstack skills to: ${dest}\n`);
  
  if (fs.existsSync(dest)) {
    console.log('  Removing existing installation...');
    fs.rmSync(dest, { recursive: true, force: true });
  }

  if (copyRecursive(SKILLS_SOURCE, dest)) {
    const skillCount = countSkills();
    console.log(`  ✓ Copied ${skillCount} skills`);
    console.log(`\n✨ fstack v${VERSION} installed successfully!\n`);
    console.log('Start with: /flash-mode <your task>\n');
  } else {
    console.error('Installation failed');
    process.exit(1);
  }
}

function uninstall(platform, scope = 'local') {
  if (platform === 'all') {
    console.log('\n🗑️  Uninstalling fstack from all platforms...\n');
    let removed = 0;
    for (const [key, config] of Object.entries(PLATFORMS)) {
      const globalPath = config.global;
      const localPath = path.resolve(config.local);
      
      for (const p of [globalPath, localPath]) {
        if (fs.existsSync(p)) {
          fs.rmSync(p, { recursive: true, force: true });
          console.log(`  ✓ Removed: ${p}`);
          removed++;
        }
      }
    }
    console.log(`\n✨ Removed ${removed} installation(s)\n`);
    return;
  }

  const config = PLATFORMS[platform];
  if (!config) {
    console.error(`Unknown platform: ${platform}`);
    process.exit(1);
  }

  const dest = scope === 'global' ? config.global : path.resolve(config.local);
  
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
    console.log(`\n✓ Removed fstack from: ${dest}\n`);
  } else {
    console.log(`\nfstack not found at: ${dest}\n`);
  }
}

function list() {
  console.log('\n📋 Supported Platforms:\n');
  for (const [key, config] of Object.entries(PLATFORMS)) {
    console.log(`  ${key.padEnd(15)} ${config.name} (${config.description})`);
    console.log(`                  Local:  ${config.local}`);
    console.log(`                  Global: ${config.global}\n`);
  }
}

function status() {
  console.log('\n📊 fstack Installation Status:\n');
  let found = false;
  
  for (const [key, config] of Object.entries(PLATFORMS)) {
    const globalExists = fs.existsSync(config.global);
    const localExists = fs.existsSync(path.resolve(config.local));
    
    if (globalExists || localExists) {
      found = true;
      console.log(`  ${config.name}:`);
      if (globalExists) console.log(`    ✓ Global: ${config.global}`);
      if (localExists) console.log(`    ✓ Local:  ${path.resolve(config.local)}`);
      console.log();
    }
  }
  
  if (!found) {
    console.log('  No installations found.\n');
    console.log('  Run: npx fstack init --platform cursor\n');
  }
}

function info(quiet = false) {
  if (quiet) {
    return;
  }
  
  const skillCount = countSkills();
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   fstack v${VERSION.padEnd(52)}║
║   Agent skills for designers & frontend developers           ║
║                                                               ║
║   ${String(skillCount).padStart(2)} skills: playbooks, helpers, principles              ║
║                                                               ║
║   Quick Start:                                                ║
║     npx fstack init --platform cursor                        ║
║     npx fstack init --platform claude-code --global          ║
║                                                               ║
║   Then in your IDE:                                           ║
║     /flash-mode implement this Figma design                  ║
║                                                               ║
║   Docs: https://github.com/fstack-plugin/fstack              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);
}

function showHelp() {
  console.log(`
fstack v${VERSION} - Agent skills for designers & frontend developers

USAGE:
  fstack <command> [options]
  npx fstack <command> [options]

COMMANDS:
  init              Install fstack skills to a platform
  uninstall         Remove fstack from a platform
  list              Show supported platforms
  status            Check installation status
  info              Show package info
  help              Show this help

OPTIONS:
  --platform, -p    Target platform (cursor, claude-code, codex, antigravity, opencode, windsurf, copilot, all)
  --global, -g      Install to user home directory (available to all projects)
  --local, -l       Install to current project directory (default)
  --path            Custom installation path

EXAMPLES:
  npx fstack init --platform cursor              # Local project install for Cursor
  npx fstack init --platform cursor --global     # Global install for Cursor
  npx fstack init --platform claude-code -g      # Global install for Claude Code
  npx fstack init --platform all                 # Install to all detected platforms
  npx fstack init --path ./my-skills/fstack      # Custom path
  npx fstack uninstall --platform cursor         # Remove from Cursor
  npx fstack status                              # Check what's installed

SUPPORTED PLATFORMS:
  cursor          Cursor IDE
  claude-code     Anthropic Claude Code
  codex           OpenAI Codex
  antigravity     Antigravity IDE
  opencode        Open Code
  windsurf        Codeium Windsurf
  copilot         GitHub Copilot
  all             All detected platforms

After installing, start with:
  /flash-mode <your task>

Documentation: https://github.com/fstack-plugin/fstack
`);
}

// Parse arguments
const args = process.argv.slice(2);
const command = args[0];

let platform = 'cursor';
let scope = 'local';
let customPath = null;
let quiet = false;

for (let i = 1; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--platform' || arg === '-p') {
    platform = args[++i];
  } else if (arg === '--global' || arg === '-g') {
    scope = 'global';
  } else if (arg === '--local' || arg === '-l') {
    scope = 'local';
  } else if (arg === '--path') {
    customPath = args[++i];
  } else if (arg === '--quiet' || arg === '-q') {
    quiet = true;
  }
}

switch (command) {
  case 'init':
  case 'install':
    install(platform, scope, customPath);
    break;
  case 'uninstall':
  case 'remove':
    uninstall(platform, scope);
    break;
  case 'list':
  case 'platforms':
    list();
    break;
  case 'status':
    status();
    break;
  case 'info':
    info(quiet);
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  case undefined:
    info(quiet);
    break;
  default:
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}
