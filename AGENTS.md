# A2IDE Platform — Agent Coding Constitution

## Project
A2IDE Cloud IDE Platform · TechIEG / Cforge.ai
Stack: Next.js 14 · ADK 2.0 · A2A v1.0 · Anthropic Claude · GCP

## Standards
- TypeScript strict mode — no `any` except explicit cast with comment
- All agents follow ADK v2.0 patterns (InMemoryRunner for dev, ManagedAgentRunner for prod)
- Every skill must have a SKILL.md and a corresponding eval in /evals/
- Skills scoped to: `org | project` — declare in metadata
- No hardcoded credentials — Secret Manager only

## Branch Strategy
- `main` — golden copy, protected. PRs only, require 1 approval
- `epic/phase1-ide-shell-auth` — A2IDE-1 (stories A2IDE-9–12)
- `epic/phase1-skill-registry` — A2IDE-2 (stories A2IDE-13–16)
- `epic/phase2-adk-orchestrator` — A2IDE-3 (stories A2IDE-17–20)
- `epic/phase2-a2a-protocol` — A2IDE-4 (stories A2IDE-21–23)
- `epic/phase3-antigravity-sdk` — A2IDE-5 (stories A2IDE-24–26)
- `epic/phase3-skills-standard` — A2IDE-6 (stories A2IDE-27–28)
- `epic/phase4-code-gen-ci` — A2IDE-7 (stories A2IDE-29–30)
- `epic/phase4-cd-dora` — A2IDE-8 (stories A2IDE-31–32)

## Commit Convention
feat(A2IDE-XX): description
fix(A2IDE-XX): description
chore: description

## Tool use
- MCP-first for external integrations
- Antigravity SDK for managed agent sandboxing
- A2A v1.0 for inter-agent communication

## Agent Rules
1. Always read AGENTS.md before starting a task
2. Scaffold with `adk new` for new agents
3. Write eval before marking story Done
4. Deploy with `adk deploy` — never manual Cloud Run pushes
5. Max tool-use loop: 10 iterations
