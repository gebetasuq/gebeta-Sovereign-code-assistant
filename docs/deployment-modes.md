# Deployment Modes

## Overview

Gebeta Sovereign Code Assistant offers two deployment modes to balance privacy and productivity.

## Mode Comparison

| Aspect | Mode A: Maximum Privacy | Mode B: Productivity |
|--------|------------------------|---------------------|
| **Best For** | Sensitive IP, fintech, compliance | Prototyping, multi-agent workflows |
| **Cloud Dependency** | Zero after setup | Warp account required |
| **Sovereignty** | Maximum | Controlled trade-off |
| **Setup Complexity** | Moderate | Moderate |
| **Orchestration** | Local only | Warp + local |
| **Auditability** | Full local logs | Local + Warp logs |
| **Account Required** | No | Yes (Warp) |

---

## Mode A: Maximum Privacy (Air-Gapped)

### When to Use

- Your code is sensitive (fintech, government, internal IP)
- You want zero cloud dependencies
- You care more about sovereignty than convenience
- Compliance requires air-gapped development

### Stack

- Ollama (local inference)
- Continue (IDE agent)
- VS Code (telemetry disabled)
- Local terminal only
- Optional: offline VM or air-gapped workstation

### Setup

```bash
# Use the safe mode config
cp configs/continue-config-safe.yaml ~/.continue/config.yaml

# (Optional) Block Ollama outbound
sudo ufw deny out from any to any port 11434
```

Pros

· ✅ Maximum data sovereignty
· ✅ No account required
· ✅ Best trust posture
· ✅ Optional air-gapped operation
· ✅ Suitable for high-sensitivity workflows

Cons

· ❌ No cloud-linked orchestration conveniences
· ❌ Less frictionless than hosted tooling
· ❌ Team rollout needs stronger local ops discipline
· ❌ No multi-agent parallelism

---

Mode B: Productivity Mode

When to Use

· You want advanced multi-agent workflows
· You accept a managed UX trade-off
· You want a stronger terminal experience
· Speed and convenience matter more than absolute sovereignty

Stack

· Ollama + Continue
· Warp terminal (with ZDR enabled)
· Hardened internet-enabled environment

Setup

```bash
# Install Warp
brew install --cask warp  # macOS
winget install Warp.Warp  # Windows

# Enable Zero Data Retention in Warp settings
# Disable cloud sync

# Use standard config
cp configs/continue-config.yaml ~/.continue/config.yaml
```

Additional Hardening

· Enable Zero Data Retention in Warp
· Disable Warp cloud sync
· Never paste sensitive code into Warp AI chat
· Use Continue for sensitive repo interactions

Pros

· ✅ Better orchestration
· ✅ Stronger terminal UX
· ✅ Parallel agent workflows
· ✅ Faster experimentation
· ✅ Good for solo builders and small teams

Cons

· ❌ Requires sign-in
· ❌ Cloud metadata exposure is possible
· ❌ Weaker sovereignty posture than Mode A
· ❌ Warp account required

---

Decision Matrix

Your Priority Recommended Mode
Maximum privacy + zero cloud Mode A
Compliance / regulated industry Mode A
Proprietary IP protection Mode A
Speed + convenience Mode B
Multi-agent workflows Mode B
Solo founder prototyping Mode B
Team of 3-20 developers Either (Mode A for sensitive repos, Mode B for others)

---

Switching Between Modes

From Mode A to Mode B

```bash
# Install Warp
# Enable ZDR
cp configs/continue-config.yaml ~/.continue/config.yaml
```

From Mode B to Mode A

```bash
# Disable Warp for sensitive work
cp configs/continue-config-safe.yaml ~/.continue/config.yaml
# (Optional) Block Ollama outbound
```

---

Hybrid Approach

Some teams use both modes:

· Mode A for sensitive repositories (payment, auth, compliance)
· Mode B for public or low-sensitivity code (documentation, examples)

To switch per project:

```bash
# Per-repository config
cp configs/continue-config.yaml /path/to/project/.continue/config.yaml
```

---

Last updated: April 2026

```
