# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static landing page for "마음결 음악치유센터" (a music-therapy service). There is no build tooling, package manager, bundler, or test framework — it's plain HTML/CSS/JS.

## Commands

- No build/install step. Open `index.html` directly in a browser, or serve it statically, e.g. `python -m http.server` run from this directory.
- No lint or test commands are configured.

## Architecture

- `index.html`, `style.css`, `script.js` — the landing page. `style.css` defines the color/font system as CSS custom properties in `:root`; change the palette there rather than hardcoding colors in individual rules.
- `apps-script/Code.gs` — the form backend, written as a Google Apps Script rather than a conventional server. It is **not deployed from this repo**: it must be manually pasted into an Apps Script project bound to a Google Sheet and deployed as a Web App from Google's own console (see the setup comment at the top of `Code.gs`). `doPost()` there does three things per submission: appends a row to the Sheet, emails the owner address (`OWNER_EMAIL` constant), and auto-replies to the applicant's email.
- The frontend and backend are coupled only through a URL: `script.js`'s `WEBAPP_URL` constant must be set to the exec URL produced by deploying `Code.gs`. If form submissions silently fail, check that this URL has been filled in (it ships with a placeholder) and that it points at the current deployment.
- Submission flow: `#applyForm` in `index.html` → `fetch(WEBAPP_URL, ...)` in `script.js` (POSTs JSON as `text/plain` to dodge CORS preflight) → `doPost()` in `Code.gs`.
