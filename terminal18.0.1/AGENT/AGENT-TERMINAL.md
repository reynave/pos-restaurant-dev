# AGENT-TERMINAL.md - POS Terminal (terminal18.0.1)

Development reference for AI agents working on the Angular terminal app.
This document maps frontend routes, guard behavior, backend API usage, and operational flows.

---

## 1. Scope

This app is the in-store POS terminal client used on each restaurant device.

- Framework: Angular (standalone components)
- Main router file: `src/app/app.routes.ts`
- Backend base API: `ConfigService.getApiUrl()` -> `{server}terminal/`
- Backend reference: `service/AGENT/AGENTS-SERVER.md` in server repo

Important: frontend path `/menu`, `/bill`, etc. are Angular routes; HTTP calls go to `/api/terminal/*` via configured server URL.

---

## 2. Route Map (Frontend)

### 2.1 Public and setup routes

| Path | Component | Guard | Purpose |
|---|---|---|---|
| `/` | SetupComponent | - | First-time setup / server config |
| `/setup` | SetupComponent | - | Setup page |
| `/home` | HomeComponent | - | Alternate entry |
| `/factory` | FactoryComponent | - | Factory/settings utility |
| `/login/terminal` | TerminalLoginComponent | - | Terminal license validation |
| `/login` | LoginComponent | - | Employee login |
| `/relogin` | ReloginComponent | - | User re-login |
| `/terminalRelogin` | TerminalReloginComponent | - | Terminal rebind flow |
| `/customerDisplay` | CustomerDisplayComponent | - | Customer-facing display view |

### 2.2 Authenticated operational routes

Guard combinations used:

- `authGuard` = employee JWT exists
- `terminalGuard` = terminal id exists
- `loginGuard` = local login flag is set
- `dailyStartGuard` = active daily check exists

| Path | Component | Guards |
|---|---|---|
| `/navBar` | NavBarComponent | auth + login |
| `/setting` | SettingComponent | auth + login |
| `/cashier` | CashierComponent | auth + daily + terminal + login |
| `/tables` | TablesComponent | auth + daily + terminal + login |
| `/menu` | MenuComponent | auth + daily + terminal + login |
| `/menu/transferItems` | TransferItemsComponent | auth + daily + terminal + login |
| `/menu/transferItemsGroup` | TransferItemsGroupComponent | auth + daily + terminal + login |
| `/menu/lock` | MenuLockComponent | auth + daily + terminal + login |
| `/menu/voidItem` | MenuVoidItemComponent | auth + daily + terminal + login |
| `/bill` | BillComponent | auth + daily + terminal + login |
| `/bill/splitBill` | SplitBillComponent | auth + daily + terminal + login |
| `/payment` | PaymentComponent | auth + daily + terminal + login |
| `/receipt` | ReceiptComponent | auth + daily + terminal + login |
| `/printQueue` | PrintQueueComponent | auth + daily + terminal + login |
| `/void` | VoidComponent | auth + daily + terminal + login |
| `/items` | ItemsComponent | auth + daily + terminal + login |
| `/userLogs` | UserLogsComponent | auth + daily + terminal + login |
| `/transaction` | TransactionComponent | auth + terminal + login |
| `/transaction/bill` | TransactionBillComponent | auth + terminal + login |
| `/transaction/detail` | TransactionDetailComponent | auth + terminal + login |
| `/daily/start` | DailyStartComponent | auth + terminal + login |
| `/daily/close` | DailyCloseComponent | auth + daily + terminal + login |
| `/daily/cashBalance` | DailyCashBalanceComponent | auth + daily + terminal + login |
| `/reports` | ReportsComponent | auth + terminal + login |

### 2.3 Fallback route

| Path | Component |
|---|---|
| `**` | PageNotFoundComponent |

---

## 3. Guard Contract and Local Storage Keys

Guards read localStorage directly, so key consistency is critical.

| Guard | Required Key | Current behavior if missing |
|---|---|---|
| `authGuard` | `pos3.tokenKey.mitralink` | `navigate(['/error'])` then block |
| `terminalGuard` | `pos3.terminal.mitralink` | `navigate(['/login/terminal'])` then block |
| `dailyStartGuard` | `pos3.dailyCheck.mitralink` | `navigate(['/daily/start'])` then block |
| `loginGuard` | `pos3.login` must be `'1'` | returns false, no redirect |

Additional important keys used across app:

- `pos3.address.mitralink` (terminal address binding)
- `pos3.config.mitralink` (outlet/printer config JSON)
- `pos3.env.server` (override backend server URL)
- `pos3.outlet.mitralink` (selected outlet)
- `pos3.language`, `pos3.languageData`

---

## 4. Runtime Flow (End-to-End)

### 4.1 Device setup and terminal bind

1. Setup stores server in `pos3.env.server`.
2. User opens `/login/terminal` and submits `terminalId`.
3. Frontend calls `POST terminal/login/terminal`.
4. Frontend verifies JWT signature client-side (`JwtVerifyService`) and checks payload terminal id.
5. On success, stores terminal keys and emits Socket.IO `broadcast-reload`.

### 4.2 Employee login

1. `/login` loads outlets via `GET terminal/login/outlet`.
2. Submit login via `POST terminal/login/signin`.
3. Stores token/config, sets `pos3.login = '1'`.
4. If no active daily check -> `/daily/start`.
5. If outlet mode is cashier -> `/cashier`; otherwise `/navBar`.

### 4.3 Daily operation

1. Daily start: `POST terminal/daily/start` then store `pos3.dailyCheck.mitralink`.
2. Table mode: `/tables` -> lock table -> `/menu` -> `/bill` -> `/payment` -> `/receipt`.
3. Cashier mode: `/cashier` -> `/menu` -> `/payment`.
4. Optional utilities: `/printQueue`, `/void`, `/items`, `/reports`.

---

## 5. Backend API Mapping Used by Frontend

Base URL from frontend is `getApiUrl()` = `{server}terminal/`.

Observed endpoint groups used in terminal app code:

- Login/terminal: `login/outlet`, `login/signin`, `login/terminal`, `login/checkTerminal`
- Daily: `daily/start`, `daily/close`, `daily/getDailyStart`, `daily/checkItems`, `daily/cashBalance`, `daily/checkCashType`, `daily/addCashIn`
- Table and order: `tableMap`, `tableMap/detail`, `tableMap/newOrder`, `menuItemPos/*`
- Bill and payment: `bill/*`, `payment/*`, `receipt/`
- Transaction: `transaction/`, `transaction/detail`, `transaction/getCopyBill`, `transaction/addCopyBill`
- Print queue and printing: `printQueue/queue`, `printQueue/fnReprint`, `printQueue/fnRushPrint`, `printQueue/template`
- Cashier mode: `cashier/queue`, `cashier/newOrder`, `cashier/deleteOrder`
- Reporting: `menuReports/selectReports`, `menuReports/getUsers`, `menuReports/createReportToken`, `reports/*`
- Logs: `log` (from `UserLoggerService`)

Server-side authoritative definitions are in AGENTS-SERVER.md.

---

## 6. Socket.IO Behavior

Client listens on:

- `reload`: when same terminal id is detected with different address, app removes terminal binding and redirects to `/terminalRelogin`.

Client emits:

- `broadcast-reload` after successful terminal login.
- other pages may emit `message-from-client` to trigger reload flow.

---

## 7. Known Gaps and Risks (Frontend)

1. JWT license secret is embedded client-side in `JwtVerifyService`; acceptable only if treated as tamper signal, not strong secrecy.
2. Many access checks depend purely on localStorage presence, so stale keys can cause inconsistent UX if not cleaned on sign-off.

Resolved in this iteration:

- `authGuard` now redirects to `/login` (valid route).
- `loginGuard` now redirects to `/login` when login flag is missing.
- reports outlet endpoint updated to `menuReports/getOutlets`.

---

## 8. Agent Working Rules for This App

When changing this terminal project, AI agents should follow these rules:

1. Do not change localStorage key names unless all guards and components are updated together.
2. Keep route guard combinations intact for POS-critical pages unless explicitly requested.
3. Any router change must be validated against backend endpoint availability in server docs.
4. For login/daily/terminal flows, verify both navigation and key lifecycle (set/remove) paths.
5. Prefer minimal edits in this codebase; many pages are operationally sensitive during live restaurant hours.

---

## 9. Quick Trace (Frontend Route -> Backend Prefix)

| Frontend route group | Main backend prefix |
|---|---|
| `/login*` | `terminal/login/*` |
| `/daily/*` | `terminal/daily/*` |
| `/tables` | `terminal/tableMap*` |
| `/menu*` | `terminal/menuItemPos/*` |
| `/bill*` | `terminal/bill/*` + `terminal/payment/*` |
| `/payment` | `terminal/payment/*` |
| `/receipt` | `terminal/receipt/*` |
| `/transaction*` | `terminal/transaction/*` |
| `/printQueue` | `terminal/printQueue/*` |
| `/cashier` | `terminal/cashier/*` |
| `/reports` | `terminal/menuReports/*` + `terminal/reports/*` |
| `/userLogs` | `terminal/log/*` |

This file is intended as the first reference before editing routes, guards, login flow, or endpoint integration.

---

## 10. Debug Checklist Per Route

Use this quick checklist when debugging route issues in terminal app.

### 10.1 Guard and session checks

1. Confirm required localStorage keys exist:
	- `pos3.tokenKey.mitralink`
	- `pos3.terminal.mitralink`
	- `pos3.dailyCheck.mitralink` (for daily-protected pages)
	- `pos3.login = '1'`
2. Confirm route guard stack in `app.routes.ts` matches expected flow.
3. If blocked, inspect browser console for guard redirect and current URL.

### 10.2 API request checks

1. Verify base URL from `ConfigService.getApiUrl()` is correct (`{server}terminal/`).
2. In DevTools Network, validate:
	- request path (`terminal/...`)
	- method (GET/POST)
	- headers include Bearer token and `X-Terminal` for protected endpoints
3. Confirm backend returns expected payload shape (common fields: `error`, `message`, `data`).

### 10.3 Flow-specific checks

1. Terminal login issues:
	- endpoint `login/terminal`
	- JWT payload terminal id matches input id
	- terminal/address keys saved after success
2. Daily start issues:
	- endpoint `daily/start`
	- `pos3.dailyCheck.mitralink` saved after success
3. Report issues:
	- `menuReports/selectReports`
	- `menuReports/getUsers`
	- `menuReports/getOutlets`
	- token generation via `menuReports/createReportToken`

### 10.4 Socket and rebind checks

1. Confirm socket connected to `ConfigService.getServerUrl()`.
2. On `reload` event, verify terminal id/address comparison logic in app root.
3. If address changed, ensure local terminal keys are removed and app navigates to `/terminalRelogin`.
