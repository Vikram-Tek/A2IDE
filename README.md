# A2IDE — Cloud IDE Platform

> Multi-tenant cloud IDE powered by **Google ADK 2.0** · **A2A v1.0** · **Anthropic Claude**  
> Built by TechIEG / Cforge.ai

## Stack
- **IDE Shell**: Next.js 14, Monaco Editor, React Resizable Panels
- **Auth**: NextAuth.js + Google Workspace SSO
- **Agent Mesh**: Google ADK 2.0 Orchestrator + Sub-agents
- **Protocol**: A2A v1.0 inter-agent communication
- **Model Backend**: Anthropic Claude (Sonnet 4 / Opus 4)
- **Infra**: GCP (Cloud Run, Agent Engine, Firestore, GCS, Secret Manager)
- **CI/CD**: Harness CI/CD + Harness STO

## Branch Strategy
See [AGENTS.md](./AGENTS.md) for full branch strategy and coding standards.

| Branch | Epic | Stories |
|--------|------|---------|
| `main` | Golden copy | Protected |
| `epic/phase1-ide-shell-auth` | A2IDE-1 | A2IDE-9–12 |
| `epic/phase1-skill-registry` | A2IDE-2 | A2IDE-13–16 |
| `epic/phase2-adk-orchestrator` | A2IDE-3 | A2IDE-17–20 |
| `epic/phase2-a2a-protocol` | A2IDE-4 | A2IDE-21–23 |
| `epic/phase3-antigravity-sdk` | A2IDE-5 | A2IDE-24–26 |
| `epic/phase3-skills-standard` | A2IDE-6 | A2IDE-27–28 |
| `epic/phase4-code-gen-ci` | A2IDE-7 | A2IDE-29–30 |
| `epic/phase4-cd-dora` | A2IDE-8 | A2IDE-31–32 |

## Getting Started
\`\`\`bash
cp apps/ide/.env.example apps/ide/.env.local
npm install
npm run dev
\`\`\`
