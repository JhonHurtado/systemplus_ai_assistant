# Contributing to SystemPlus AI Assistant

Thank you for your interest in contributing to the SystemPlus AI Assistant! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Environment Setup](#development-environment-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to `desarrollo@systemplus.edu.co`.

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as GitHub issues. When you create an issue, please use the bug report template and provide detailed information about:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected behavior
- Current behavior
- Screenshots (if applicable)
- Your environment (OS, browser, version, etc.)

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- An explanation of why this enhancement would be useful
- Any relevant examples or mock-ups

### Pull Requests

- Fill in the required pull request template
- Do not include issue numbers in the PR title
- Update documentation as needed
- End all files with a newline
- Avoid platform-dependent code

## Development Environment Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/systemplus_ai_assistant.git`
3. Install dependencies: `npm install`
4. Create a branch for your feature: `git checkout -b feature/your-feature-name`
5. Set up your development environment according to the [installation guide](./INSTALLATION.md)

## Coding Standards

### TypeScript Style Guide

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use PascalCase for class names and interfaces
- Use camelCase for variables, functions, and method names
- Use UPPER_CASE for constants
- Add proper JSDoc comments for all public methods and classes

### CSS/HTML Style Guide

- Use 2 spaces for indentation
- Classes should follow kebab-case naming convention
- Comment sections of CSS that might not be self-explanatory
- Use semantic HTML elements where appropriate

## Pull Request Process

1. Ensure your code adheres to the coding standards
2. Update documentation if necessary
3. Pass all tests (run `npm test`)
4. The PR needs at least one approval from a maintainer
5. Once approved, a maintainer will merge your PR

## Branch Naming Convention

- `feature/description` - For new features
- `bugfix/description` - For bug fixes
- `docs/description` - For documentation changes
- `refactor/description` - For code refactoring
- `test/description` - For adding or updating tests

## Commit Message Guidelines

We follow a simplified version of the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat: Description` - For new features
- `fix: Description` - For bug fixes
- `docs: Description` - For documentation changes
- `style: Description` - For formatting, missing semicolons, etc.
- `refactor: Description` - For code changes that neither fix a bug nor add a feature
- `test: Description` - For adding or fixing tests
- `chore: Description` - For changes to the build process, auxiliary tools, etc.

Example: `feat: add new message suggestion component`

Thank you for contributing to the SystemPlus AI Assistant!