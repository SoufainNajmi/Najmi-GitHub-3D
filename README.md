# Najmi GitHub 3D

Najmi GitHub 3D is an automated GitHub profile visualization tool that combines 3D contribution graphs, developer statistics, customizable themes and GitHub Actions automation.

## Features

- Typed GitHub GraphQL data collection with `GITHUB_TOKEN`
- Contribution calendar normalized into five visual intensity levels
- Isometric SVG cubes generated without a browser or React
- Current and longest streaks, yearly/monthly totals, repositories, stars, issues, pull requests and commits
- Top languages and most active repositories
- Five extensible themes: Najmi Dark, Neon, Developer, AI and Morocco
- CLI commands for generation, statistics and configuration validation
- Scheduled and manual GitHub Actions workflows
- Strict TypeScript, ESLint, Prettier and Vitest

## Installation

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run build
```

Copy `.env.example` to `.env` or export the variables in your shell:

```bash
export GITHUB_TOKEN=github_pat_your_token
export GITHUB_USERNAME=your-username
```

The token needs read access to the public profile and repository metadata used by the GraphQL query. Never commit it.

## Configuration

Edit `najmi.config.yml`:

```yaml
github:
  username: your-username
theme:
  name: najmi-dark
visualization:
  perspective: true
  animation: false
statistics:
  enabled: true
output:
  directory: ./output
```

Supported themes are `najmi-dark`, `najmi-neon`, `najmi-developer`, `najmi-ai` and `najmi-morocco`.

## CLI

```bash
npm run dev -- validate --username your-username
npm run dev -- stats --username your-username
npm run dev -- generate --username your-username --theme najmi-neon
```

Generated assets include `profile-3d-<theme>.svg` and `profile-stats.svg`. They are plain SVG files and can be embedded directly in a GitHub profile README.

## GitHub Actions

The included workflow runs every day at 18:00 UTC and can also be started with **Run workflow**. It installs dependencies, calls the GraphQL API, generates SVG assets and commits changes to `output/`.

For a private or organization-specific token, add a repository secret named `NAJMI_GITHUB_TOKEN`. The workflow falls back to the workflow token for public profile data. Review repository permissions before enabling automatic commits.

## Architecture

```text
GitHub GraphQL API
        |
   GitHubClient -> Data Collector -> Processor -> Statistics Engine
                                                   |
                                      Theme Registry -> SVG Scene/Cubes
                                                   |
                                           Generated Profile Assets
```

The source is divided by responsibility: `src/github` handles transport and API contracts, `src/data` normalizes responses, `src/statistics` calculates profile metrics, `src/visualization` builds the isometric scene, `src/themes` owns visual configuration, and `src/svg` writes optimized assets.

## Examples

A generated scene contains accessible SVG metadata and layered polygons for each contribution day. The five color levels map from no contribution to the highest relative activity. Run the CLI with a real token to create the files in `output/`.

## Development and testing

```bash
npm run validate
npm test
npm run dev -- validate --username your-username
```

The test suite covers GraphQL errors, empty data, contribution levels, streaks, configuration validation, theme lookup and SVG output. Network calls are mocked in tests.

## Contributing

Open an issue for a bug or proposal, then submit a focused pull request with tests. Keep modules independently testable and run `npm run validate` before submitting.

## Based on an open-source project

Najmi GitHub 3D is an independent implementation inspired by the general idea of `github-profile-3d-contrib`. It does not copy that project's source code or architecture. The contribution-calendar concept and the goal of producing GitHub-ready SVG profile assets are retained; the GraphQL client, data model, statistics engine, theme registry, isometric renderer, CLI, workflows and tests are newly designed for this project.

## License

Released under the MIT License. See [LICENSE](LICENSE).
