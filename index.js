/**
 * fstack - Agent skills for designers & frontend developers
 * 
 * This package is primarily used via CLI:
 *   npx fstack init --platform cursor
 * 
 * But can also be used programmatically to get skill paths.
 */

const path = require('path');
const fs = require('fs');

const PACKAGE_ROOT = __dirname;
const SKILLS_DIR = path.join(PACKAGE_ROOT, 'skills');

/**
 * Get the path to the skills directory
 */
function getSkillsPath() {
  return SKILLS_DIR;
}

/**
 * Get all skill files
 */
function getAllSkills() {
  const skills = [];
  
  function walk(dir, relativePath = '') {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory()) {
        walk(fullPath, relPath);
      } else if (entry.name === 'SKILL.md') {
        skills.push({
          path: fullPath,
          relativePath: relPath,
          name: path.basename(path.dirname(fullPath))
        });
      }
    }
  }
  
  walk(SKILLS_DIR);
  return skills;
}

/**
 * Get a specific skill by name
 */
function getSkill(name) {
  const skills = getAllSkills();
  return skills.find(s => s.name === name);
}

/**
 * Read skill content
 */
function readSkill(name) {
  const skill = getSkill(name);
  if (!skill) return null;
  return fs.readFileSync(skill.path, 'utf-8');
}

/**
 * Get skill manifest
 */
function getManifest() {
  const manifestPath = path.join(PACKAGE_ROOT, 'skill.json');
  if (fs.existsSync(manifestPath)) {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  }
  return null;
}

module.exports = {
  getSkillsPath,
  getAllSkills,
  getSkill,
  readSkill,
  getManifest,
  SKILLS_DIR,
  VERSION: require('./package.json').version
};
