# Security & Trust Documentation

## Threat Model

### What This Setup Reduces Exposure To

| Risk | Mitigation |
|------|-------------|
| Third-party AI training on proprietary code | Local models only, no cloud API calls |
| Cloud prompt retention | No data sent to hosted model providers |
| Accidental source leakage via copilots | Air-gappable configuration |
| Over-permissioned coding agents | Manual approval for dangerous commands |
| Terminal execution without review | Agent asks before running shell commands |

### What This Setup Does NOT Protect Against

- Malicious local dependencies (npm, pip, etc.)
- Insecure shell commands approved by the user
- Compromised OS / endpoint malware
- Package manager supply-chain attacks
- Git remote misconfiguration (e.g., pushing secrets to a public repo)
- Insider threat / deliberate data exfiltration
- Insecure developer operational habits

## Trust Boundary Diagram

```

+-----------------------------------------------------+

|                   TRUSTED ZONE                      |

|   +----------+      +---------------+              |

|   | Developer|----->| VS Code +     |              |

|   +----------+      | Continue      |              |

|                     +-------+-------+              |

|                             |                      |

|                     +-------v-------+              |

|                     | Ollama Local  |              |

|                     | API :11434    |              |

|                     +-------+-------+              |

|                             |                      |

|                     +-------v-------+              |

|                     | Local Model   |              |

|                     | (Qwen/Llama)  |              |

|                     +-------+-------+              |

|                             |                      |

|                     +-------v-------+              |

|                     | Filesystem /  |              |

|                     | Terminal      |              |

|                     +-------+-------+              |
+-----------------------------+----------------------+

```

## Data Flow

1. **Code never leaves your machine** when using Mode A
2. **Model inference happens locally** via Ollama
3. **File operations** are performed by Continue with your approval
4. **Terminal commands** require explicit user confirmation
5. **Warp (Mode B only)** adds optional orchestration with ZDR enabled

## Recommended Security Practices

### For Individuals

- Always review agent actions before approving
- Never paste API keys or secrets into chat
- Use `.gitignore` to exclude sensitive files
- Regularly update Ollama and models

### For Teams

- Distribute shared configuration files
- Enforce project guardrails via `gebeta-rules.md`
- Preserve local audit logs
- Conduct periodic security reviews
- Disable cloud-linked features in sensitive repositories

## Compliance-Friendly Design

Gebeta Sovereign Code Assistant is designed to support environments that require:

- Controlled developer tooling
- Local data residency
- Auditable agent actions
- Reduced third-party code exposure
- Configurable approval workflows
- Repeatable engineering standards

> **Important:** This tool does not automatically make an organization compliant. It helps support a compliance-friendly engineering posture.

---

**Last updated:** April 2026
```

---
