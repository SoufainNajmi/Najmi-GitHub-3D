# Architecture

Najmi GitHub 3D follows a pipeline with explicit boundaries:

1. `github/client.ts` sends one typed GraphQL request and translates transport/API failures into `GitHubApiError`.
2. `data/collector.ts` converts GitHub's nested response into a stable `GitHubProfileData` model and aggregates language bytes.
3. `data/processor.ts` maps each day to a week, weekday and relative level from 0 to 4.
4. `statistics/` calculates streaks, totals, language rankings and active repositories without network access.
5. `themes/` is a registry of immutable visual definitions. New themes only require a registry entry.
6. `visualization/` renders the contribution matrix as layered SVG polygons.
7. `svg/generator.ts` writes profile assets and the statistics card.
8. `cli.ts` composes the pipeline for local runs and GitHub Actions.

No module in the statistics or visualization layers depends on `fetch`, environment variables or a GitHub SDK. This keeps the expensive boundary mockable and makes deterministic tests possible.
