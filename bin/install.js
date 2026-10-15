#!/usr/bin/env node
// Installs every skill from ./skills into .claude/skills/<name>, then Vercel's find-skills
//   npx ui-skills-kit                    -> current project (./.claude/skills)
//   npx ui-skills-kit --global           -> ~/.claude/skills
//   npx ui-skills-kit --no-find-skills   -> skip find-skills
//   postinstall (npm i)                  -> project that ran npm install (INIT_CWD), no find-skills (no network in postinstall)
const fs = require('fs')
const path = require('path')
const os = require('os')
const { spawnSync } = require('child_process')

const args = process.argv.slice(2)
const isPostinstall = args.includes('--postinstall')
const isGlobal = args.includes('--global') || args.includes('-g')
const withFindSkills = !isPostinstall && !args.includes('--no-find-skills')

const srcRoot = path.join(__dirname, '..', 'skills')
const root = isGlobal ? os.homedir() : (process.env.INIT_CWD || process.cwd())

// Don't install into ourselves when developing the package
if (isPostinstall && path.resolve(root) === path.resolve(__dirname, '..')) process.exit(0)

const skillsDir = path.join(root, '.claude', 'skills')
const FIND_SKILLS_CMD = `npx -y skills add vercel-labs/skills --skill find-skills -a claude-code -y${isGlobal ? ' -g' : ''}`

try {
  // Older versions of this package installed as "layouts-skill"; remove it so the skill doesn't load twice
  const legacy = path.join(skillsDir, 'layouts-skill')
  if (fs.existsSync(path.join(legacy, 'SKILL.md'))) {
    fs.rmSync(legacy, { recursive: true, force: true })
    console.log(`✔ removed old layouts-skill -> replaced by ui-layouts`)
  }

  for (const name of fs.readdirSync(srcRoot)) {
    const dest = path.join(skillsDir, name)
    fs.rmSync(dest, { recursive: true, force: true })
    fs.mkdirSync(skillsDir, { recursive: true })
    fs.cpSync(path.join(srcRoot, name), dest, { recursive: true })
    console.log(`✔ ${name} skill installed -> ${dest}`)
  }
} catch (err) {
  console.error(`✖ ui-skills-kit: copy failed (${err.message})`)
  // never break someone's npm install
  process.exit(isPostinstall ? 0 : 1)
}

if (withFindSkills) {
  if (fs.existsSync(path.join(skillsDir, 'find-skills', 'SKILL.md'))) {
    console.log('✔ find-skills already installed')
  } else {
    console.log('… installing find-skills (vercel-labs/skills)')
    const res = spawnSync(FIND_SKILLS_CMD, { cwd: root, stdio: 'inherit', shell: true })
    if (res.status !== 0) {
      console.warn(`! find-skills was not installed. Run it yourself:\n  ${FIND_SKILLS_CMD}`)
    }
  }
}
