# Privacy Policy

**Last Updated:** December 2024

## Overview

The AI Design System Generator is designed with privacy as a core principle. This document explains how your data is handled when using the application.

## Data Collection

**We do NOT collect, store, or transmit any user data to our servers.**

The application operates entirely in your browser and processes data locally or through third-party APIs that you explicitly authorize.

## Data Processing

### Design Prompts
- Your prompts are sent to AI providers (via Spark LLM SDK) to generate design tokens
- Prompts are processed in real-time and not stored permanently
- Last generated tokens are cached locally in your browser for convenience (can be cleared)

### Design Tokens
- Generated tokens exist only in your browser's memory and local storage
- Tokens are never uploaded to our servers
- You have full control over exporting and sharing tokens

### Figma Personal Access Tokens
- Your Figma Personal Access Token is NEVER stored
- Tokens are used in-memory only for the duration of the Figma push operation
- Tokens are immediately discarded after use
- We strongly recommend generating a token specifically for this tool and revoking it after use

## Third-Party Services

### AI Generation (Spark LLM SDK)
When you generate design tokens:
- Your prompt is sent to the AI provider configured in Spark
- The AI provider processes your request and returns design tokens
- Refer to OpenAI's privacy policy for their data handling practices

### Figma API
When you push tokens to Figma:
- Your Figma Personal Access Token is used to authenticate API requests
- Token data is sent directly from your browser to Figma's API
- No intermediary storage or logging occurs
- Refer to Figma's privacy policy for their data handling practices

## Local Storage

The application uses browser local storage (via Spark KV) to cache:
- Your last generated design token set
- No personally identifiable information is stored

You can clear this data at any time by:
1. Using your browser's clear cache/storage feature
2. Generating new tokens (overwrites previous cache)

## Cookies

This application does not use cookies.

## Your Rights

You have complete control over your data:
- **Access**: All data is visible in the UI
- **Delete**: Clear browser storage or regenerate tokens
- **Export**: Download your tokens as JSON or CSS at any time
- **Control**: Choose what data to send to third-party services

## Security

We implement security best practices:
- No server-side data persistence
- Secure HTTPS connections for all API calls
- Figma tokens handled in-memory only
- Clear warnings when data will be sent to external services

## Children's Privacy

This application is not directed at children under 13. We do not knowingly collect information from children.

## Changes to This Policy

We may update this privacy policy from time to time. Significant changes will be indicated in the application.

## Contact

If you have questions about this privacy policy or data handling:
- Review the source code (open source)
- Open an issue on GitHub
- Contact the maintainers

## Compliance

This application is designed to be GDPR and CCPA compliant through:
- No data collection by default
- User consent for third-party API calls
- Transparency in data handling
- User control over all data

---

**Summary**: We don't store your data. You're in control. Third-party APIs (AI, Figma) follow their own privacy policies when you choose to use them.
