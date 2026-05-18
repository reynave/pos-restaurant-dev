# AGENT-ADMIN.md - Admin Panel (admin18.0.1)

Development reference for AI agents working on the Angular admin panel app.
This document maps frontend routes, authentication, backend API usage, and operational architecture.

---

## 1. Scope

This app is the restaurant admin control panel for master data management, reporting, and configuration.

- Framework: Angular (standalone components)
- Main router file: `src/app/app.routes.ts`
- Backend base API: from `environment.api` (injected at build time)
- Backend reference: `service/AGENT/AGENTS-SERVER.md` in server repo
- Authentication: simple token check, no route guards defined

Important: unlike terminal app, admin uses single flat token check at app root level, not per-route guards.

---

## 2. Route Map (Frontend)

All routes accessible after root-level token validation. No per-route guards; navigation delegated to tree menu click logic in app.component.

### 2.1 Employee Management

| Path | Component | Purpose |
|---|---|---|
| `/employee` | EmployeeComponent | Employee list, add/edit |
| `/employee/authLevel` | AuthLevelComponent | Authorization levels (roles) |
| `/employee/authLevel/accessRight` | AccessRightComponent | Module access permissions per role |
| `/employee/dept` | DeptEmployeeComponent | Employee departments |
| `/employee/orderLevel` | OrderLevelEmployeeComponent | Employee order authorization levels |

### 2.2 Daily Schedule & Holiday

| Path | Component | Purpose |
|---|---|---|
| `/dailySchedule` | DailyScheduleComponent | Restaurant open/close times |
| `/specialHour` | SpecialHoursComponent | Special operating hours override |
| `/holidayList` | HolidayListComponent | Holiday calendar |

### 2.3 Payment Configuration

| Path | Component | Purpose |
|---|---|---|
| `/payment/paymentType` | PaymentTypeComponent | Payment method types (cash, card, etc) |
| `/payment/paymentGroup` | PaymentGroupComponent | Payment method groups |
| `/payment/cashType` | CashTypeComponent | Cash denominations |
| `/payment/taxType` | TaxTypeComponent | Tax types and rates |
| `/payment/serviceCharge` | PaymentServiceChargeComponent | Service charge rules |
| `/payment/foreignCurrency` | ForeignCurrencyTypeComponent | Foreign currency support |
| `/payment/wpSvcCard` | WpSvcCardComponent | Wallet/prepaid service card |
| `/payment/wbDeposit` | WpDepositComponent | Wallet/bank deposit |
| `/payment/icCard` | IcCardComponent | IC/membership card integration |

### 2.4 Discount & Promotion

| Path | Component | Purpose |
|---|---|---|
| `/discount/discGroup` | DiscGroupComponent | Discount groups (bundled rules) |
| `/discount` | DiscountComponent | Individual discount rules |

### 2.5 Others (Legacy - Not Used in Current Real Case)

Status: menu/flow for this group is no longer used in current operations. Routes may still exist in Angular router for compatibility.

| Path | Component | Purpose |
|---|---|---|
| `/other/voidCode` | VoidCodeComponent | Void/cancellation reason codes |
| `/other/pantryMessage` | PantryMessageComponent | Kitchen display messages |
| `/other/functionAuthority` | FunctionAuthorityComponent | Function-level access control |
| `/other/functionList` | FunctionListComponent | List of available functions |
| `/other/functionShortCuts` | FunctionShortCutsComponent | Function keyboard shortcuts |

### 2.6 Member Management (Legacy - Not Used in Current Real Case)

Status: menu/flow for this group is no longer used in current operations. Routes may still exist in Angular router for compatibility.

| Path | Component | Purpose |
|---|---|---|
| `/member/profile` | MemberProfileComponent | Member profiles, add/edit |
| `/member/classes` | MemberClassesComponent | Member classifications |
| `/member/period` | MemberPeriodComponent | Membership periods |
| `/member/account` | MemberAccountComponent | Member accounts |
| `/member/accountHolder` | MemberAccountHolderComponent | Account holder info |
| `/member/costCentre` | CostCentreComponent | Cost centre mapping |

### 2.7 Complaint Management (Legacy - Not Used in Current Real Case)

Status: menu/flow for this group is no longer used in current operations. Routes may still exist in Angular router for compatibility.

| Path | Component | Purpose |
|---|---|---|
| `/complaint/category` | ComplaintCategoryComponent | Complaint categories |
| `/complaint/type` | ComplaintTypeComponent | Complaint types within category |

### 2.8 Customer Management (Legacy - Not Used in Current Real Case)

Status: menu/flow for this group is no longer used in current operations. Routes may still exist in Angular router for compatibility.

| Path | Component | Purpose |
|---|---|---|
| `/customer/info` | CustomerInfoComponent | Customer info records |
| `/customer/grp` | CustomerGrpComponent | Customer groupings |

### 2.9 Templates (Legacy - Not Used in Current Real Case)

Status: menu/flow for this group is no longer used in current operations. Routes may still exist in Angular router for compatibility.

| Path | Component | Purpose |
|---|---|---|
| `/template` | TemplatesComponent | Bill templates, receipt templates |
| `/template/detail` | TemplateDetailComponent | Edit template content |

### 2.10 Workstation (Printer, Terminal, Tax Run)

| Path | Component | Purpose |
|---|---|---|
| `/workStation/printer` | PrinterComponent | Printer device configuration |
| `/workStation/printerGroup` | PrinterGroupComponent | Printer groups for routing |
| `/workStation/terminal` | TerminalComponent | POS terminal registration & license |
| `/workStation/pantryStation` (Legacy - Not Used in Current Real Case) | PantryStationComponent | Kitchen station configuration |
| `/workStation/printQueue` (Legacy - Not Used in Current Real Case)| PantryStationQueueComponent | Print queue monitoring |
| `/workStation/stationTaxRun` (Legacy - Not Used in Current Real Case)| StationTaxRunComponent | Tax run scheduling per station |

### 2.11 Outlet Management

| Path | Component | Purpose |
|---|---|---|
| `/outlet` | OutletComponent | Restaurant outlet/branch master |
| `/outlet/payment` (Legacy - Not Used in Current Real Case) | OutletPaymentComponent | Payment methods per outlet |
| `/outlet/cashType` (Legacy - Not Used in Current Real Case)| OutletCashTypeComponent | Cash types per outlet |
| `/outlet/discount` (Legacy - Not Used in Current Real Case)| OutletDiscountComponent | Outlet-specific discounts |
| `/outlet/specialHour` (Legacy - Not Used in Current Real Case)| OutletSpecialHourComponent | Special hours per outlet |
| `/outlet/tipsPool` (Legacy - Not Used in Current Real Case)| OutletTipsPoolComponent | Tip pooling rules per outlet |
| `/outlet/mixAndMatch` (Legacy - Not Used in Current Real Case)| OutletMixAndMatchComponent | Mix & match combo rules |
| `/outlet/bonusRules` (Legacy - Not Used in Current Real Case)| OutletBonusRulesComponent | Bonus/incentive rules |
| `/outlet/orderLevel` (Legacy - Not Used in Current Real Case)| OutletOrderLevelComponent | Outlet order authorization levels |
| `/outlet/funcAuthority` (Legacy - Not Used in Current Real Case)| OutletFuncAuthorityComponent | Function authority per outlet |

### 2.12 Menu Configuration

| Path | Component | Purpose |
|---|---|---|
| `/menu/item` | MenuItemComponent | Menu items (food/beverage) |
| `/menu/department` | MenuDeptComponent | Menu departments (kitchen, bar, etc) |
| `/menu/category` | MenuCategoryComponent | Menu categories (appetizer, main, etc) |
| `/menu/class` | MenuClassComponent | Menu classes (vegetarian, spicy, etc) |
| `/menu/lookUp` | MenuLookupComponent | Menu navigation tree |

### 2.13 Modifiers

| Path | Component | Purpose |
|---|---|---|
| `/modifier` | ModifierComponent | Modifier items (extra cheese, no sugar, etc) |
| `/modifier/group` | ModifierGroupComponent | Modifier groups (toppings, size, etc) |
| `/modifier/list` | ModifierListComponent | Modifier lists per group |

### 2.14 Reports

| Path | Component | Purpose |
|---|---|---|
| `/report/dailyClose` | DailyReportComponent | Daily close and sales summary |
| `/report/transaction` | TransactionComponent | Transaction list and drill-down |
| `/report/transaction/detail` | TransactionDetailComponent | Transaction itemization |
| `/report/userLogin` | UserLoginReportComponent | Employee login history |

### 2.15 Table Map & Floor Plan

| Path | Component | Purpose |
|---|---|---|
| `/tableMap` | TableMapComponent | Table configuration and positioning |
| `/tableMap/template` | TableMapTemplateComponent | Table icon/template management |
| `/floorMap` | FloorMapComponent | Floor plan image and layout |

### 2.16 Cashback & UX Configuration

| Path | Component | Purpose |
|---|---|---|
| `/cashback` | CashbackComponent | Cashback programs and rules |
| `/cashback/detail` | CashbackDetailComponent | Cashback detail editing |
| `/ux` | UxComponent | UI button and function configuration |
| `/language` | LanguageComponent | i18n multi-language labels |

### 2.17 Fallback

| Path | Component |
|---|---|
| `**` | PageNotFoundComponent |

---

## 3. Authentication & Session Management

### 3.1 Token and localStorage

Unlike terminal app, admin app does **not** use per-route guards. All authentication is checked at app root level.

| Key | Purpose | Set by | Removed by |
|---|---|---|---|
| `admin.tokenKey.mitralink` | Employee access token | login success | logout |
| `admin.config.mitralink` | Session config (currently unused) | login success | currently not removed by `removeToken()` |
| `pos3.admin.tab` | Last selected tab index | tab navigation | - |

### 3.2 Root-Level Token Check (app.component)

```
1. App initializes → checkLogin() called
2. ConfigService.checkToken() reads localStorage['admin.tokenKey.mitralink']
3. If token missing → `router.navigate(['login'])` is called
4. If token exists → set login = true, load menu via httpGet()
```

Notes:
- Current router config does not define `/login` route.
- Login UI is rendered directly by `app.component.html` when `login == false`.

### 3.3 Login Flow (not visible in attached files, but implied)

Observed flow in current codebase:
1. User opens app
2. App checks token in `checkLogin()`
3. If token missing, root component renders `<app-login>`
4. If token exists, app loads menu from `global/menu`
5. Navigation occurs through menu tree `onEvent()`

Legacy/route-based login flow assumption (from terminal app pattern):
1. User opens app, root redirects to `/login` if no token
2. User submits credentials
3. Backend returns token + menu structure
4. Token stored, app loads master data via `global/menu` endpoint
5. Menu tree populated from response with tabs and hierarchy

---

## 4. Menu Structure and Navigation

Admin app uses a tree-based menu system loaded dynamically from backend.

### 4.1 httpGet() response structure (from app.component)

```json
{
  "generalTab": [ ...menu items ],
  "reportTab": [ ...menu items ],
  "outletTab": [ ...menu items ],
  "menuTab": [ ...menu items ],
  "patch": "version string"
}
```

### 4.2 Menu item structure (inferred)

Each menu item likely has:
- `href` (router path)
- `label` (display name)
- `params` (optional query params as JSON string)
- Hierarchical nesting for sub-menus

### 4.3 Navigation Mechanism

1. User clicks tree node
2. `onEvent()` triggered with node data
3. If `node.data.href` exists, `router.navigate()` called with params
4. Component initializes and loads data from backend

---

## 5. Backend API Mapping Used by Frontend

Base URL from `environment.api` (injected at build time).

All endpoints follow `/api/` prefix (from server routing).

Observed endpoint groups used:

- Menu tree: `global/menu`
- Employee: `employee/*`, `employee/authLevel/*`, `employee/dept/*`, `employee/orderLevel/*`
- Schedule: `dailySchedule/*`, `specialHour/*`, `holidayList/*`
- Payment: `payment/*`, `paymentGroup/*`, `cashType/*`, `taxType/*`, `serviceCharge/*`, `foreignCurrency/*`, `wpSvcCard/*`, `wpDeposit/*`, `icCard/*`
- Discount: `discount/*`, `discountGroup/*`
- Others: `voidCode/*`, `pantryMessage/*`, `functionAuthority/*`, `functionList/*`, `functionShortCuts/*`
- Member: `member/*`, `memberClass/*`, `memberPeriod/*`, `memberAccount/*`, `costCentre/*`
- Complaint: `complaint/*`, `complaintCategory/*`, `complaintType/*`
- Customer: `customer/*`, `customerInfo/*`, `customerGrp/*`
- Template: `template/*`
- Workstation: `printer/*`, `printerGroup/*`, `terminal/*`, `pantryStation/*`, `stationTaxRun/*`
- Outlet: `outlet/*`, `outletPayment/*`, `outletCashType/*`, `outletDiscount/*`, `outletSpecialHour/*`, `outletTipsPool/*`, `outletMixAndMatch/*`, `outletBonusRules/*`, `outletFuncAuthority/*`
- Menu: `menu/*`, `menuDept/*`, `menuCategory/*`, `menuClass/*`, `menuLookup/*`
- Modifier: `modifier/*`, `modifierGroup/*`, `modifierList/*`
- Report: `report/dailyClose/*`, `report/transaction/*`, `report/userLogin/*`
- Table: `tableMap/*`, `tableMapTemplate/*`, `floorMap/*`
- Cashback: `cashback/*`
- UX: `ux/*`
- Language: `language/*`

Complete authoritative definitions in server docs: `service/AGENT/AGENTS-SERVER.md`.

---

## 6. HTTP Headers and Token

All requests use `ConfigService.headers()`:

```typescript
headers() { 
  const token = localStorage.getItem('admin.tokenKey.mitralink');
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Token': token,  // Note: not Bearer, just 'Token' header
  });
}
```

**Difference from terminal:** Terminal uses `Authorization: Bearer {token}`, admin uses `Token: {token}`.

---

## 7. Known Differences from Terminal App

1. **No route guards** — all protection at app root, simpler but less granular control.
2. **Single token type** — no terminal id, no daily check session (admin is not time-limited).
3. **Tree menu navigation** — routes driven by backend-supplied menu structure, not hardcoded.
4. **Token header format** — `Token:` instead of `Authorization: Bearer` (backend may need to support both or check config).
5. **No Socket.IO** — no real-time reload/broadcast like terminal app.
6. **Simpler logout** — `removeToken()` clears token then `window.location.reload()`; no graceful navigation.

---

## 8. Known Gaps and Risks

1. **No per-route guards** — means a user with stale token can navigate to any admin route and will fail at API call time (not ideal UX).
2. **Login component not visible** — assumed based on terminal app pattern; verify login flow independently.
3. **Hardcoded token value in dev** — `setToken()` stores literal `"testDev2025"`, should be replaced with actual server response in production.
4. **Tab index persistence** — `pos3.admin.tab` saved locally but not verified on reload; can cause state mismatch if routes change.
5. **Menu structure fetch failure** — if `httpGet()` fails, no error handling; menu stays empty.
6. **Missing back/home button** — after opening a detail view, no clear way to return to menu without browser back.

---

## 9. Agent Working Rules for Admin App

When editing admin18.0.1, follow these rules:

1. **Do not add route guards** unless root-level token check is refactored.
2. **Keep token key consistent** (`admin.tokenKey.mitralink`) across all components; search before renaming.
3. **Any API endpoint change must be verified** against server AGENTS-SERVER.md; test with correct header (`Token:` not `Authorization:`).
4. **Menu structure changes** should be coordinated with backend `global/menu` endpoint; tree navigation depends on this.
5. **Logout flow** clears token and full-page reload; ensure all unsaved state is acceptable.
6. **Admin routes are not time-limited** like terminal daily sessions; session lifetime depends solely on token validity.

---

## 10. Quick Trace (Frontend Route -> Backend Prefix)

| Frontend route group | Main backend prefix |
|---|---|
| `/employee*` | `employee/*` |
| `/dailySchedule` | `dailySchedule/*` |
| `/specialHour` | `specialHour/*` |
| `/holidayList` | `holidayList/*` |
| `/payment*` | `payment/*` |
| `/discount*` | `discount/*` |
| `/other*` | `voidCode/*`, `pantryMessage/*`, `functionAuthority/*`, etc |
| `/member*` | `member/*` |
| `/complaint*` | `complaint/*` |
| `/customer*` | `customer/*` |
| `/template*` | `template/*` |
| `/workStation*` | `printer/*`, `terminal/*`, `pantryStation/*`, etc |
| `/outlet*` | `outlet/*` |
| `/menu*` | `menu/*` |
| `/modifier*` | `modifier/*` |
| `/report*` | `report/*` |
| `/tableMap*` | `tableMap/*`, `floorMap/*` |
| `/cashback*` | `cashback/*` |
| `/ux` | `ux/*` |
| `/language` | `language/*` |

---

## 11. Debug Checklist Per Feature

### 11.1 General checks before any change

1. Verify token exists: `localStorage.getItem('admin.tokenKey.mitralink')` (not empty).
2. Open DevTools Network; confirm all API requests include `Token: {token}` header (not `Authorization: Bearer`).
3. Confirm `environment.api` is set correctly at build time; check app startup console for API base URL.

### 11.2 Menu/navigation issues

1. Verify `httpGet()` succeeds: check Network tab for `global/menu` request status.
2. If menu empty, check response payload has `generalTab`, `reportTab`, `outletTab`, `menuTab`.
3. Confirm tree node click fires `onEvent()` with correct `href` in node data.

### 11.3 Route-specific issues

1. If page blank after navigation, check browser console for 404 on component load or API call.
2. Verify correct backend endpoint for that feature (cross-ref AGENTS-SERVER.md).
3. Use Network tab to inspect request/response shape; admin uses same backend as terminal.

### 11.4 Token and session issues

1. If redirected to login unexpectedly, token may have expired; check localStorage.
2. Verify `checkToken()` logic: should return true only if `admin.tokenKey.mitralink` is present and non-null.
3. Current behavior removes token key only. If config cleanup is required, add `removeItem('admin.config.mitralink')` in `removeToken()`.

---

## 12. File Structure Reference

```
admin18.0.1/
├── src/app/
│   ├── app.routes.ts               # Route definitions (~100 lines)
│   ├── app.component.ts            # Root component, token check, menu load
│   ├── login/                      # Login component (structure assumed)
│   ├── service/
│   │   └── config.service.ts       # Token management, headers, auth
│   ├── module/                     # Feature modules organized by domain
│   │   ├── employee/
│   │   ├── payment/
│   │   ├── discount/
│   │   ├── others/
│   │   ├── member/
│   │   ├── complaint/
│   │   ├── customer/
│   │   ├── templates/
│   │   ├── workstation/
│   │   ├── outlet/
│   │   ├── menu/
│   │   ├── table-map/
│   │   ├── floor-map/
│   │   ├── general/                # Shared utilities, cashback, ux, language
│   │   └── report/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   └── home/                       # Fallback/home component
├── AGENT/
│   └── AGENT-ADMIN.md              # This file
└── ...
```

---

This file is the starting reference before editing admin routes, adding features, or debugging admin panel issues.
