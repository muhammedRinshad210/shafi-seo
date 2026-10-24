# Shafi SEO — Developer & Agent Workflow Guide

This document defines the development, quality assurance, and Git release standards for the **Shafi SEO Specialist Portfolio** repository. All autonomous agents, pairs, and contributors operating in this codebase must strictly adhere to this workflow for every task.

---

## 1. Remote Repository Configuration

- **Target Origin:** `https://github.com/muhammedRinshad210/shafi-seo.git`
- **Default Branch:** `main`
- **Rule:** Never change the remote URL away from this target repository unless explicitly instructed by the repository owner.

---

## 2. Mandatory Task-by-Task Git Workflow

Every independently completed task in this repository must be verified and saved to GitHub before moving on to subsequent work. Follow these steps sequentially:

### Step 1: Pre-Task Inspection
- Check current status and active branch:
  ```bash
  git status
  git branch --show-current
  ```
- **Preserve Uncommitted Changes:** Never run destructive reset commands (`git reset --hard`, `git checkout -- .`, `git clean -fd`) that discard unrelated user edits or work in progress.

### Step 2: Implementation & Local Validation
- Implement requested changes cleanly according to design and technical standards.
- Test in the local development environment (`npm run dev`).
- Ensure no layout shifts, console errors, or broken accessibility paths.

### Step 3: Lint & Production Build Validation
- Run static analysis and production build before staging any code:
  ```bash
  npm run lint
  npm run build
  ```
- **Rule:** If a task produces lint warnings, TypeScript errors, or a broken build, **do not push it as a completed task**. Fix the underlying issue and re-run validation until both pass cleanly with exit code 0.

### Step 4: Diff Review & Secret Detection
- Review all modified files line-by-line:
  ```bash
  git diff
  ```
- **Security Check:** Verify that no API keys, tokens, credentials, `.env` files, or un-ignored generated artifacts (`dist/`, `node_modules/`, scratch logs) are staged or committed.

### Step 5: Surgical Staging
- Stage **only** the specific files associated with the completed task:
  ```bash
  git add <file1> <file2> ...
  ```
- Do not use `git add .` or `git add -A` if unrelated or incomplete files exist in the working directory.

### Step 6: Task-Specific Conventional Commit
- Write a clear, meaningful commit message following conventional commits:
  ```bash
  git commit -m "feat: descriptive task summary"
  # Examples:
  # feat: add premium website entrance experience
  # fix: make audio toggle functional
  # feat: add Manjeri local SEO positioning
  # docs: establish task-by-task GitHub workflow
  ```

### Step 7: Push & Remote Verification
- Push the completed commit to the intended branch:
  ```bash
  git push origin main
  ```
- Inspect command output to confirm the push succeeded.
- Verify the latest commit hash:
  ```bash
  git rev-parse --short HEAD
  ```
- Report the successful commit hash and summary of changes to the user.

### Step 8: Sequential Progress
- Proceed to the next task **only after** the previous task has been successfully verified, committed, pushed, and recorded.
- Never batch incomplete tasks together under false claims of completion.

---

## 3. Conflict, Authentication & Safety Rules

1. **No Force Pushing:** Never use `git push --force` or `git push -f`. Overwriting remote history risks data loss.
2. **Safe Conflict Resolution:** If a push is rejected due to remote updates or non-fast-forward divergence:
   - Preserve local changes.
   - Fetch remote changes safely: `git fetch origin main`.
   - Reconcile cleanly: `git rebase origin/main` or `git merge origin/main`.
   - Re-test lint and build before pushing again.
3. **Authentication Handling:**
   - If GitHub authentication fails, inform the user with exact setup steps (e.g. running `gh auth login` or configuring SSH keys).
   - **Zero Credentials in Chat:** Never ask the user to paste Personal Access Tokens (PATs) or passwords into chat.
   - **Zero Credentials in Repository:** Never write credentials or secrets into workspace files.

---

## 4. Tech Stack & Quality Standards

- **Core:** React 19 + TypeScript + Vite.
- **CSS:** Vanilla CSS design tokens (`src/index.css`, `src/App.css`), high-contrast dark palette (`#0B0C0E`), restrained neon lime accent (`#EBFB1D`), responsive grid/flexbox.
- **Audio:** Web Audio API with soft harmonic pads (196 Hz G3 + 293.66 Hz D4), smooth gain ramps, clean node disconnection on unmount, and strict compliance with browser autoplay gesture policies.
- **SEO & Location:** Accurate local representation based in Manjeri, Malappuram, Kerala, India without fabricating addresses, reviews, or vanity claims. Complete Schema.org JSON-LD structured data and Open Graph metadata.
