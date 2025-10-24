# Security Policy

Thanks for helping make AI Design System Generator safe for everyone.

## Reporting Security Issues

If you believe you have found a security vulnerability in this project, please report it to us through coordinated disclosure.

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please create a private security advisory or contact the maintainers directly.

Please include as much of the information listed below as you can to help us better understand and resolve the issue:

  * The type of issue (e.g., XSS, API key exposure, injection vulnerability)
  * Full paths of source file(s) related to the manifestation of the issue
  * The location of the affected source code (tag/branch/commit or direct URL)
  * Any special configuration required to reproduce the issue
  * Step-by-step instructions to reproduce the issue
  * Proof-of-concept or exploit code (if possible)
  * Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

## Security Considerations

This application handles sensitive data including:
- AI API keys (via Spark SDK)
- Figma Personal Access Tokens (in-memory only, never stored)
- User-generated design tokens

We implement the following security measures:
- No server-side storage of sensitive tokens
- Figma tokens used in-memory only and immediately discarded
- All API calls over HTTPS
- Client-side validation of inputs
- No logging of sensitive data

## Scope

Security issues in scope include:
- Authentication/authorization bypasses
- API key or token exposure
- Cross-site scripting (XSS)
- Injection vulnerabilities
- Sensitive data leakage
- Client-side security issues

## Response Timeline

We will acknowledge your report within 48 hours and provide a more detailed response within 7 days indicating the next steps in handling your report.
