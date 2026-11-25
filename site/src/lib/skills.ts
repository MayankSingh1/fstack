import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import GithubSlugger from 'github-slugger';

export type SkillType = 'router' | 'playbook' | 'helper' | 'principle';

export interface Skill {
  slug: string;
  name: string;
  description: string;
  short: string;
  type: SkillType;
  group: string;
  file: string;
  body: string;
}

function findRepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(dir, 'skill.json')) && fs.existsSync(path.join(dir, 'skills'))) return dir;
    dir = path.dirname(dir);
  }
  throw new Error('Could not find the fstack repo root (skill.json) from ' + process.cwd());
}

export const repoRoot = findRepoRoot();
export const manifest = JSON.parse(fs.readFileSync(path.join(repoRoot, 'skill.json'), 'utf8'));
export const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));

function parseFrontmatter(src: string): { data: Record<string, string>; body: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: src };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_-]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    data[kv[1]] = v.replace(/\\"/g, '"');
  }
  return { data, body: src.slice(m[0].length) };
}

function stripPrefix(desc: string): string {
  return desc
    .replace(/^(Helper skill|(Frontend|Design|Shipping) playbook|Principle)(\s+(for|to))?:?\s*/i, '')
    .replace(/^./, (c) => c.toUpperCase());
}

const groupOf = new Map<string, string>();
for (const [group, files] of Object.entries(manifest.skills.playbooks as Record<string, string[]>)) {
  for (const f of files) groupOf.set(f, group);
}

function load(file: string, type: SkillType, group: string): Skill {
  const src = fs.readFileSync(path.join(repoRoot, file), 'utf8');
  const { data, body } = parseFrontmatter(src);
  const slug = data.name || path.basename(path.dirname(file));
  const description = stripPrefix(data.description || '');
  const short = (description.match(/^.*?[.!?](\s|$)/)?.[0] ?? description).trim();
  return {
    slug,
    name: slug,
    description,
    short,
    type,
    group,
    file,
    body,
  };
}

let cache: Skill[] | null = null;

export function getSkills(): Skill[] {
  if (cache) return cache;
  const s = manifest.skills;
  const list: Skill[] = [];
  for (const f of s.router as string[]) list.push(load(f, 'router', 'router'));
  for (const [group, files] of Object.entries(s.playbooks as Record<string, string[]>)) {
    for (const f of files) list.push(load(f, 'playbook', group));
  }
  for (const f of s.helpers as string[]) list.push(load(f, 'helper', 'helper'));
  for (const f of s.principles as string[]) list.push(load(f, 'principle', 'principle'));
  cache = list;
  return list;
}

export function counts() {
  const all = getSkills();
  return {
    total: all.length,
    playbooks: all.filter((s) => s.type === 'playbook').length,
    helpers: all.filter((s) => s.type === 'helper').length,
    principles: all.filter((s) => s.type === 'principle').length,
  };
}

export const groupLabels: Record<string, string> = {
  router: 'Router',
  design: 'Design',
  frontend: 'Frontend',
  shipping: 'Shipping',
  session: 'Session',
  advanced: 'Advanced',
  helper: 'Helper',
  principle: 'Principle',
};

const ACRONYMS: Record<string, string> = { pr: 'PR', ux: 'UX', ui: 'UI', ia: 'IA', a11y: 'a11y', tdd: 'TDD', hifi: 'hi-fi', to: 'to', a: 'a' };
export function titleOf(slug: string): string {
  return slug
    .split('-')
    .map((w, i) => ACRONYMS[w] && !(i === 0 && (w === 'to' || w === 'a')) ? ACRONYMS[w] : w[0].toUpperCase() + w.slice(1))
    .join(' ');
}

export interface Heading { depth: number; text: string; id: string }

export function renderMarkdown(src: string): { html: string; headings: Heading[] } {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const plain = text.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    const id = slugger.slug(plain);
    headings.push({ depth, text: plain, id });
    return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${text}</h${depth}>`;
  };
  renderer.table = function (token) {
    const html = marked.Renderer.prototype.table.call(this, token);
    return `<div class="table-wrap">${html}</div>`;
  };
  const html = marked.parse(src, { renderer, gfm: true, async: false }) as string;
  return { html, headings };
}

export function readRepoFile(rel: string): string {
  return fs.readFileSync(path.join(repoRoot, rel), 'utf8');
}

export const repoUrl = 'https://github.com/MayankSingh1/fstack';
export const npmUrl = 'https://www.npmjs.com/package/fstack-skills';
