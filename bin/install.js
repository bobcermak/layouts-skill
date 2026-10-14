#!/usr/bin/env node
// Copies the skill into .claude/skills/layouts-skill
//   npx layouts-skill            -> current project (./.claude/skills)
//   npx layouts-skill --global   -> ~/.claude/skills
//   postinstall (npm i)         -> project that ran npm install (INIT_CWD)
const fs = require('fs')
const path = require('path')
const os = require('os')

const args = process.argv.slice(2)
const isPostinstall = args.includes('--postinstall')
const isGlobal = args.includes('--global') || args.includes('-g')

const src = path.join(__dirname, '..', 'skill')
const root = isGlobal ? os.homedir() : (process.env.INIT_CWD || process.cwd())

// Don't install into ourselves when developing the package
if (isPostinstall && path.resolve(root) === path.resolve(__dirname, '..')) process.exit(0)

const dest = path.join(root, '.claude', 'skills', 'layouts-skill')

try {
  fs.rmSync(dest, { recursive: true, force: true })
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.cpSync(src, dest, { recursive: true })
  console.log(`✔ layouts-skill skill installed -> ${dest}`)
} catch (err) {
  console.error(`✖ layouts-skill: copy failed (${err.message})`)
  // never break someone's npm install
  process.exit(isPostinstall ? 0 : 1)
}
