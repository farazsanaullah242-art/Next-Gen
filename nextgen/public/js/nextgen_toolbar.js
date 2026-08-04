// Next GEN - Classic desktop-style toolbar for ERPNext
// Single source of truth for the menu structure. Edit labels/routes here.
const NEXTGEN_TOOLBAR_MENU = [
	{
		label: "Add",
		items: [
			{ label: "Accounts Main Head", route: "app/tree/Account", type: "tree" },
			{ label: "Accounts", route: "app/account", type: "list" },
			{ label: "Item Super Heads", route: "app/tree/Item Group", type: "tree" },
			{ label: "Items Main Head", route: "app/item", type: "list" },
			{ label: "Items", route: "app/item", type: "list" },
			{ label: "Sale Man", route: "app/sales-person", type: "list" },
			{ label: "Delete Item & Transfer Data to New Item No", route: "app/item", type: "merge-item" },
			{ label: "Delete A/c & Shift Data to Other A/c", route: "app/account", type: "merge-account" },
			{ label: "Change Area of a Party", route: "app/customer", type: "list" },
		],
	},
	{
		label: "Entries",
		items: [
			{ label: "Journal Entry", route: "app/journal-entry", type: "new" },
			{ label: "Cash Book", route: "app/payment-entry", type: "new" },
			{ label: "Entries List", route: "app/journal-entry", type: "list" },
		],
	},
	{
		label: "Reports",
		items: [
			{ label: "Ledger", route: "app/query-report/General Ledger", type: "report" },
			{ label: "Trial Balance", route: "app/query-report/Trial Balance", type: "report" },
			{ label: "Trial Balance With Activity", route: "app/query-report/Trial Balance Simple", type: "report" },
			{ label: "Balance Sheet / Profit and Loss", route: "app/query-report/Balance Sheet", type: "report" },
			{ label: "Aging Report", route: "app/query-report/Aging Report", type: "report" },
		],
	},
	{
		label: "Bills",
		items: [
			{ label: "Sale Bill", route: "app/sales-invoice", type: "new" },
			{ label: "Purchase Bill", route: "app/purchase-invoice", type: "new" },
			{ label: "List of Sale Bills", route: "app/sales-invoice", type: "list" },
			{ label: "List of Purchase Bills", route: "app/purchase-invoice", type: "list" },
		],
	},
	{
		label: "Stock",
		items: [
			{ label: "Item Ledger", route: "app/query-report/Stock Ledger", type: "report" },
			{ label: "Stock Balance", route: "app/query-report/Stock Balance", type: "report" },
			{ label: "Stock Balance With Activity", route: "app/query-report/Stock Analytics", type: "report" },
		],
	},
	{
		label: "Utilities",
		items: [
			{ label: "Create New User", route: "app/user", type: "new" },
			{ label: "Change Password", route: "update-password", type: "page" },
			{ label: "Log Out", route: "", type: "logout" },
		],
	},
];

// ---- Renderer -----------------------------------------------------------
frappe.ready(() => {
	if (!frappe.boot) return; // only on desk / logged-in pages

	const $bar = $(`
		<div id="nextgen-toolbar" class="nextgen-toolbar">
			<ul class="nextgen-toolbar__menu"></ul>
		</div>
	`);

	const $menu = $bar.find(".nextgen-toolbar__menu");

	NEXTGEN_TOOLBAR_MENU.forEach((group) => {
		const $li = $(`<li class="nextgen-toolbar__item nextgen-dropdown">
			<a href="#" class="nextgen-toolbar__label">${__(group.label)}</a>
			<ul class="nextgen-toolbar__submenu"></ul>
		</li>`);
		const $sub = $li.find(".nextgen-toolbar__submenu");

		group.items.forEach((item) => {
			const $a = $(`<a href="#" class="nextgen-toolbar__link" data-label="${__(item.label)}">${__(item.label)}</a>`);
			$a.on("click", (e) => {
				e.preventDefault();
				handle_action(item);
			});
			$sub.append($("<li>").append($a));
		});

		$menu.append($li);
	});

	// Insert the toolbar in the page-flow, below the navbar
	$(document.body).addClass("nextgen-toolbar-visible");
	$bar.insertAfter(".desk-navbar, .main-navbar, header.navbar");
	$(document).on("frappe.ui.app:load", function () {
		if (!$("#nextgen-toolbar").length) $bar.insertAfter(".desk-navbar, .main-navbar, header.navbar");
	});

	function handle_action(item) {
		if (item.type === "logout") {
			frappe.app.logout();
			return;
		}
		if (!item.route) return;
		frappe.set_route(item.route);
	}
});