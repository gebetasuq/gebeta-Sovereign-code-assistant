# Architecture Documentation

## High-Level Architecture

```

┌─────────────────────────────────────────────────────────────┐
│                    Developer Workstation                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │   VS Code   │◄──►│  Continue   │◄──►│   Ollama    │      │
│  │   Editor    │    │  Extension  │    │   Server    │      │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘      │
│                            │                  │              │
│                            │                  │              │
│                      ┌─────▼─────┐      ┌─────▼─────┐        │
│                      │  Rules    │      │  Local    │        │
│                      │  Engine   │      │  Models   │        │
│                      └─────┬─────┘      └─────┬─────┘        │
│                            │                  │              │
│                      ┌─────▼─────────────────▼─────┐         │
│                      │      Filesystem / Terminal    │         │
│                      └───────────────────────────────┘         │
│                                                               │
└───────────────────────────────────────────────────────────────┘

```

## Component Descriptions

### Ollama

**Role:** Local LLM inference server

**Responsibilities:**
- Load and run quantized language models
- Provide REST API for model inference
- Manage model storage and memory

**Configuration:**
- API endpoint: `http://localhost:11434`
- Models stored in `~/.ollama/models/`

### Continue Extension

**Role:** IDE integration and agent orchestration

**Responsibilities:**
- Provide chat interface within VS Code
- Execute agent actions (file read/write, terminal commands)
- Apply configuration from `config.yaml`
- Respect project guardrails

**Configuration:**
- Config file: `~/.continue/config.yaml`
- Rules directory: `.continue/rules/`

### Gebeta Control Layer

**Role:** Policy enforcement and governance

**Components:**
1. **Safe Command Policy** — Blocks dangerous commands without approval
2. **Project Guardrails** — Injects coding standards into every request
3. **Audit Logging** — Preserves action history locally
4. **Deployment Modes** — Privacy or productivity configurations

## Data Flow

### Mode A (Maximum Privacy)

```

User Prompt → Continue → Local Model (Ollama) → Response → User Approval → File/Terminal Action

```

**No external network calls after setup.**

### Mode B (Productivity)

```

User Prompt → Continue → Local Model (Ollama) → Response → User Approval → File/Terminal Action
│
▼
Warp Orchestration
│
▼
ZDR-Enabled Cloud

```

**Warp requires account but data retention is zero.**

## Trust Boundaries

| Boundary | Components | Trust Level |
|----------|-----------|-------------|
| Trusted Zone | VS Code, Continue, Ollama, Local Models, Filesystem | Full trust |
| Conditional Zone | Warp (Mode B only) | Conditional trust (ZDR enabled) |
| External Risk Zone | Warp cloud, Model registries, OS telemetry | No trust for code |

## Security Controls

| Control | Implementation |
|---------|----------------|
| Network isolation | Firewall rules block Ollama outbound (optional) |
| Command approval | Continue asks before running shell commands |
| File access | Continue respects file permissions |
| Audit trail | Local history files preserved |
| Configuration | YAML files control model and tool access |

## Performance Considerations

| Factor | Impact | Mitigation |
|--------|--------|------------|
| Model size | RAM usage | Use quantized models (q4_0) |
| GPU availability | Inference speed | Enable CUDA for NVIDIA GPUs |
| Context length | Repository understanding | Configure `maxTokens` appropriately |
| Concurrent requests | Resource contention | Set `OLLAMA_NUM_PARALLEL=1` |

---

**Last updated:** April 2026
```
