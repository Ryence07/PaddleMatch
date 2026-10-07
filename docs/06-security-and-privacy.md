# SECURITY CHECKLIST

## Secrets

| # | Check | Status | Evidence |
|---|---|---|---|
| 1 | `.env` is gitignored and not tracked | Yes | `.gitignore` contains `.env` rules, and `git ls-files` shows only `.env.example` files. |
| 2 | `.env.example` is committed with placeholders only | Yes | Root, client, and server `.env.example` files contain placeholders and no real credentials. |
| 3 | No hardcoded credentials in the repository | Yes | Current repository scans found no real database passwords, API keys, or secrets. |
| 4 | Git history is clean of credentials | Yes | Git history was scanned for database URLs, passwords, secrets, and API keys; no actual database credential was found. |
| 5 | Any committed credentials were rotated | N/A | No actual database credential or API key was found in Git history. |
| 6 | Production credentials are stored only in hosting environment settings | Yes | Production database credentials are not committed; deployment credentials will be provided through the hosting platform environment settings. |

## GitHub Actions

| # | Check | Status | Evidence |
|---|---|---|---|
| 7 | No secret literals in workflow files | Yes | `.github/workflows/deploy-pages.yml` contains no database password, API key, or other secret literal. |
| 8 | GitHub Actions secrets are stored securely | N/A | The current Pages workflow does not require a private secret; it only uses public Vite configuration variables. |
| 9 | Workflow does not print secrets | Yes | The workflow does not echo or dump credentials, and a successful recent workflow run was reviewed. |
| 10 | Artifacts do not contain `.env` or secret files | Yes | The Pages artifact is created from `client/dist` only; `.env` files are not part of the build output. |
| 11 | Third-party actions are pinned to commit SHAs | No | The workflow currently references GitHub Actions using version tags such as `@v4` and `@v3`, rather than full commit SHAs. |
| 12 | Secret scanning and push protection are enabled | Yes | GitHub Secret Scanning and Push Protection are enabled in repository security settings. |

## Database

| # | Check | Status | Evidence |
|---|---|---|---|
| 13 | User-input database queries are parameterized | Yes | Repository queries use parameterized PostgreSQL queries such as `WHERE id = $1` with `[id]`. |
| 14 | Database is not openly reachable from the whole internet | No | Neon currently allows public internet access from any IP address on the current plan. |
| 15 | Database user has only required permissions | No | The application currently uses the Neon `neondb_owner` role, which has broad database privileges. |
| 16 | Seed data is invented and not personal data | Yes | Seed player records were changed to fictional names and do not use classmates' personal information. |
| 17 | Debug/seed/reset HTTP routes are removed | Yes | `server/server.js` contains no HTTP seed, reset, or debug routes. Database reset is handled only through local scripts. |

## Access Control

| # | Check | Status | Evidence |
|---|---|---|---|
| 18 | Application has an access layer | Yes | Express HTTP Basic Authentication was added to protect application routes. |
| 19 | Supabase/Firebase RLS is enabled where required | N/A | PaddleMatch uses Neon PostgreSQL, not Supabase or Firebase. |
| 20 | Access credentials are stored securely | Yes | Basic Auth credentials use `APP_USERNAME` and `APP_PASSWORD` environment variables; placeholders only are committed to `.env.example`. |
| 21 | Access control covers every application route | Yes | `app.use(basicAuth)` is placed before `/healthz`, `/readyz`, and all API routes. |
| 22 | Access credentials come from environment variables | Yes | Authentication compares against `process.env.APP_USERNAME` and `process.env.APP_PASSWORD`. |

## Input / Output

| # | Check | Status | Evidence |
|---|---|---|---|
| 23 | Server validates user input | Yes | `parseId()` validates paddle and player IDs and rejects invalid values with HTTP 400. |
| 24 | User text is safely escaped | Yes | A repository scan found no use of React's `dangerouslySetInnerHTML`. |
| 25 | Errors do not expose stack traces, file paths, or connection details | Yes | API errors return generic messages such as `Something went wrong on the server`; database details are logged server-side only. |
| 26 | CORS is not configured as a wildcard | Yes | CORS uses the `CORS_ORIGINS` environment variable instead of `origin: '*'`. |

## Repository / Privacy

| # | Check | Status | Evidence |
|---|---|---|---|
| 27 | No student number, personal email, phone number, or home address is in the repository/history | No | The current files were checked, but Git history still contains the author's personal Gmail address. |
| 28 | No classmate personal data is in the repository/history | No | Current seed data uses fictional players, but older Git commits still contain the original classmates' names. |
| 29 | Official registries, `node_modules`, and build output are ignored | Yes | `client/node_modules`, `server/node_modules`, and `client/dist` are ignored by Git. |
| 30 | Assets are owned, licensed, or credited | Yes | No image assets were found under `client/src`; therefore there are currently no bundled image assets requiring attribution. |
| 31 | Repository visibility is deliberate and verified | Yes | GitHub repository visibility was checked directly and the repository is currently public. |

## Anything I found and fixed

The project was reviewed for secrets, database security, API validation, privacy, and repository configuration. I removed real student seed data by replacing it with fictional player data, added server-side ID validation, added HTTP Basic Authentication, restricted CORS through environment configuration, and verified GitHub Secret Scanning and Push Protection.

The current repository is clean of actual database credentials, but two issues remain in older Git history: the author's personal email and previously used classmate names. These historical records were identified during the security review and were not rewritten during this pass.