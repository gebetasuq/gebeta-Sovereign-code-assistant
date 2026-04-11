# Contributing to Gebeta Sovereign Code Assistant

Thank you for your interest in contributing! We welcome contributions of all kinds.

## Ways to Contribute

- 🐛 **Report bugs** — Open an issue with reproduction steps
- 💡 **Suggest features** — Describe the problem and proposed solution
- 📝 **Improve documentation** — Fix typos, clarify instructions, add examples
- 🔧 **Submit code** — Fix bugs or add features
- 🌟 **Star the repository** — Help others discover the project
- 📢 **Share with your network** — Spread the word

## Getting Started

### Prerequisites

- Git
- Basic understanding of YAML and markdown
- (For code contributions) Familiarity with Continue extension architecture

### Local Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/gebeta-sovereign-code-assistant
   cd gebeta-sovereign-code-assistant
```

1. Test changes locally using the Quick Start Guide

Contribution Guidelines

For Documentation Changes

· Keep language clear and accessible
· Use markdown formatting consistently
· Test any code blocks before submitting

For Configuration Changes

· Maintain backward compatibility where possible
· Document any new configuration options
· Test with both Mode A and Mode B

For Code Changes

· Open an issue first to discuss the change
· Follow existing code style
· Include tests where applicable
· Update documentation accordingly

Pull Request Process

1. Open an issue describing the change
2. Fork the repository and create a branch
3. Make your changes with clear commit messages
4. Test your changes locally
5. Submit a pull request referencing the issue
6. Respond to feedback from maintainers

Issue Reporting

When reporting a bug, please include:

· Operating system and version
· Ollama version (ollama --version)
· Continue version
· Steps to reproduce
· Expected vs actual behavior
· Screenshots or logs (if applicable)

Feature Requests

When suggesting a feature, please include:

· Problem statement (what doesn't work today?)
· Proposed solution (how would it work?)
· Alternative approaches considered
· Use case examples

Secret Scanning (Pre-commit Hook)

To prevent accidental commits of secrets, we recommend installing gitleaks:

```bash
# Install gitleaks (macOS)
brew install gitleaks

# Install gitleaks (Linux)
curl -sSfL https://github.com/gitleaks/gitleaks/releases/latest/download/gitleaks_linux_x64.tar.gz | tar xz
sudo mv gitleaks /usr/local/bin/

# Run locally before committing
gitleaks detect --source . --verbose
```

Add the following pre-commit hook (.git/hooks/pre-commit):

```bash
#!/bin/sh
echo "Running gitleaks secret scan..."
gitleaks detect --source . --verbose --redact
if [ $? -ne 0 ]; then
  echo "❌ Gitleaks found secrets. Commit aborted."
  exit 1
fi
```

Make it executable: chmod +x .git/hooks/pre-commit

This ensures no API keys, passwords, or tokens are ever committed to the repository.

Code of Conduct

We are committed to providing a welcoming and harassment-free experience for everyone.

· Be respectful and inclusive
· Provide constructive feedback
· Focus on the problem, not the person
· Follow the Contributor Covenant

Recognition

Contributors will be acknowledged in:

· GitHub contributors list
· Release notes
· (Optional) Project website

Questions?

Open an issue or contact the maintainer:

· Mohammed B. Kemal — Founder & System Architect
· GitHub: @gebetasuq

---

Thank you for helping build sovereign engineering infrastructure!

Last updated: April 2026

```
