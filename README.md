# Next GEN

Next GEN is a custom Frappe app for ERPNext that adds a classic, desktop-style
**toolbar menu** on top of the standard Frappe desk.

## Menu structure

- **Add** — Accounts Main Head, Accounts, Item Super Heads, Items, Sale Man,
  delete/merge utilities, change area of a party
- **Entries** — Journal Entry, Cash Book, Entries List
- **Reports** — Ledger, Trial Balance, Trial Balance With Activity,
  Balance Sheet / Profit and Loss, Aging Report
- **Bills** — Sale / Purchase Bill, List of Bills
- **Stock** — Item Ledger, Stock Balance, Stock Balance With Activity
- **Utilities** — Create New User, Change Password, Log Out

## Install

```bash
bench get-app https://github.com/farazsanaullah242-art/Next-Gen.git
bench --site yoursite install-app nextgen
bench --site yoursite migrate
```

The toolbar (menu config + renderer) lives in `nextgen/public/js/nextgen_toolbar.js`.
Edit the `NEXTGEN_TOOLBAR_MENU` object to change labels or routes.

## License

MIT