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

## ⚠️ Trust Disclaimer

Gebeta Sovereign Code Assistant provides **default configurations and recommendations** that, if followed, maintain the sovereignty and privacy guarantees described in this document.

**If you or your team:**
- Disable manual approval prompts in Continue,
- Allow telemetry or crash reporting to remain enabled,
- Skip installing the pre‑commit secret scanning hook,
- Modify firewall rules to allow outbound connections from Ollama or the agent,

…you are operating **outside** the Gebeta security model. In that case, the promises of “no code leaves your machine”, “air‑gapped operation”, and “auditability” no longer apply.

> **You are responsible for your own security posture.** Gebeta provides the tools; you must choose to use them correctly.

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

## Secret Scanning

The repository includes a `.gitleaks.toml` configuration and pre-commit hook example to prevent accidental commits of secrets (API keys, passwords, tokens). See `CONTRIBUTING.md` for setup instructions.

## Rate Limiting

Authentication endpoints are protected against brute‑force attacks:

- **Login:** 10 requests per minute per IP
- **Registration:** 5 requests per 5 minutes per IP

Exceeding the limit returns HTTP 429 with a `Retry-After` header. Rate limiting is implemented in both FastAPI and Spring Boot templates:

- FastAPI: `app/middleware/rate_limit.py` + `app/api/auth_improved.py`
- Spring Boot: `RateLimitConfig.java` + `RateLimitInterceptor.java`

## v2.0 Plugin Sandboxing Strategy

Future versions of Gebeta will support user‑written Java plugins (using `@Rule` annotations and `ServiceLoader`). Because the Java Security Manager is deprecated (JEP 486), we will adopt a **trusted plugin model** for v2.0 – only plugins written by the team itself or explicitly approved will be loaded.

For community plugins, a future version (v3.0) may explore **GraalVM isolates** or separate containerised execution to sandbox untrusted code.

For now, all plugins are considered trusted. Never load plugins from untrusted sources.

---

**Last updated:** April 2026