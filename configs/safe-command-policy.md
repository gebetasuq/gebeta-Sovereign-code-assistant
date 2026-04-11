# Gebeta Safe Command Policy

## Always Require Manual Approval

The following commands MUST always require explicit user approval before execution:

### File System Destruction
- `rm`, `del`, `rmdir` (recursive deletion)
- `rm -rf /`
- `format`, `mkfs`

### Git Destructive Operations
- `git push --force`, `git push -f`
- `git reset --hard`
- `git clean -fd`
- `git branch -D` (force delete)

### Docker Destructive Operations
- `docker system prune`
- `docker volume prune`
- `docker rm -f $(docker ps -aq)`
- `docker rmi -f $(docker images -q)`

### Permission Changes
- `chmod -R`
- `chown -R`
- `setfacl` (ACL modifications)

### Database Destructive Operations
- `DROP DATABASE`
- `DROP TABLE`
- `TRUNCATE TABLE`
- `DELETE` without WHERE clause

### Privilege Escalation
- `sudo` (any command)
- `doas`
- `su`

### Global Package Installation
- `npm install -g`
- `pip install --user`
- `gem install`
- `cargo install`

### Remote Script Execution
- `curl ... | sh`
- `curl ... | bash`
- `wget ... | sh`

## Lower-Risk Commands (May Auto-Approve)

- `git add`, `git commit`
- `npm test`, `pytest`
- `mkdir`, `touch`
- `ls`, `cat`, `head`, `tail`
- `grep`, `find` (non-destructive)

## Enforcement Principles

1. Keep **Always Ask for Permission** ON
2. Never auto-approve destructive commands
3. Treat shell access as high trust
4. Do not auto-approve package or network commands in sensitive repos
